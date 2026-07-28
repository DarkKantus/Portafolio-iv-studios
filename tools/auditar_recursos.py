"""Inventario reproducible de imágenes del portal y su prioridad de carga."""
from __future__ import annotations

import argparse
import csv
import re
from collections import defaultdict
from pathlib import Path

from PIL import Image

RAIZ_PROYECTO = Path(__file__).resolve().parents[1]
PATRON_RUTA = re.compile(r"(?:assets|\.\./assets)/[^\"'`()?#]+")
EXTENSIONES_TEXTO = {".html", ".css", ".js"}


def clasificar_criticidad(ruta: str, referencias: set[str]) -> str:
    """Devuelve la prioridad de carga según el rol visual conocido del recurso."""
    ruta_normalizada = ruta.replace("\\", "/").lower()
    if "/cursor-" in ruta_normalizada or "/icon/" in ruta_normalizada:
        return "sprite-ui"
    if "/arte y diseño/" in ruta_normalizada:
        return "galeria-diferida"
    if ruta_normalizada.endswith("/main-bg.jpg") or ruta_normalizada.endswith("/main-bg.svg"):
        return "home-inicial"
    if "/fondos/" in ruta_normalizada or "/core/" in ruta_normalizada:
        return "home-hover"
    if "/laboratorio/" in ruta_normalizada:
        return "galeria-diferida"
    if "/campaña/" in ruta_normalizada or "/eventos/" in ruta_normalizada:
        return "galeria-diferida"
    return "contenido-interactivo"


def normalizar_referencia(valor: str) -> str:
    valor = valor.replace("\\", "/")
    indice = valor.find("assets/")
    return valor[indice:] if indice >= 0 else valor


def reunir_referencias(raiz: Path) -> dict[str, set[str]]:
    referencias: dict[str, set[str]] = defaultdict(set)
    for archivo in raiz.rglob("*"):
        if not archivo.is_file() or archivo.suffix.lower() not in EXTENSIONES_TEXTO:
            continue
        if any(parte in {".git", ".hermes", "assets", "reports", "tools", "tests"} for parte in archivo.parts):
            continue
        texto = archivo.read_text(encoding="utf-8", errors="replace")
        for coincidencia in PATRON_RUTA.findall(texto):
            referencias[normalizar_referencia(coincidencia)].add(archivo.relative_to(raiz).as_posix())
    return referencias


def metadatos_imagen(archivo: Path) -> tuple[str, int, int, bool] | None:
    try:
        with Image.open(archivo) as imagen:
            tiene_alfa = "A" in imagen.getbands() or imagen.mode == "P" and "transparency" in imagen.info
            return imagen.format or archivo.suffix.lstrip(".").upper(), imagen.width, imagen.height, tiene_alfa
    except (OSError, ValueError):
        return None


def crear_inventario(raiz: Path) -> list[dict[str, object]]:
    referencias = reunir_referencias(raiz)
    filas: list[dict[str, object]] = []
    for archivo in sorted((raiz / "assets").rglob("*")):
        if not archivo.is_file():
            continue
        datos = metadatos_imagen(archivo)
        if datos is None:
            continue
        formato, ancho, alto, tiene_alfa = datos
        ruta = archivo.relative_to(raiz).as_posix()
        usos = referencias.get(ruta, set())
        filas.append(
            {
                "ruta": ruta,
                "bytes": archivo.stat().st_size,
                "formato": formato,
                "ancho": ancho,
                "alto": alto,
                "pixeles": ancho * alto,
                "alfa": tiene_alfa,
                "criticidad": clasificar_criticidad(ruta, usos),
                "referencias": ";".join(sorted(usos)),
            }
        )
    return filas


def escribir_csv(filas: list[dict[str, object]], destino: Path) -> None:
    destino.parent.mkdir(parents=True, exist_ok=True)
    campos = ["ruta", "bytes", "formato", "ancho", "alto", "pixeles", "alfa", "criticidad", "referencias"]
    with destino.open("w", newline="", encoding="utf-8") as salida:
        escritor = csv.DictWriter(salida, fieldnames=campos)
        escritor.writeheader()
        escritor.writerows(filas)


def main() -> None:
    parser = argparse.ArgumentParser(description="Audita las imágenes servidas por el Portal Kael.")
    parser.add_argument("--salida", type=Path, default=RAIZ_PROYECTO / "reports" / "recursos-antes.csv")
    argumentos = parser.parse_args()
    filas = crear_inventario(RAIZ_PROYECTO)
    escribir_csv(filas, argumentos.salida)
    total = sum(int(fila["bytes"]) for fila in filas)
    print(f"Inventario: {len(filas)} imágenes, {total / 1024 / 1024:.2f} MiB")
    for fila in sorted(filas, key=lambda item: int(item["bytes"]), reverse=True)[:10]:
        print(f"{int(fila['bytes']) / 1024 / 1024:6.2f} MiB | {fila['criticidad']:22} | {fila['ruta']}")


if __name__ == "__main__":
    main()
