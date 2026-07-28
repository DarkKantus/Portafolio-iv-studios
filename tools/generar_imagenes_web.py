"""Genera variantes WebP reproducibles para los recursos ráster del Portal Kael."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps

RAIZ_PROYECTO = Path(__file__).resolve().parents[1]
RUTA_PERFILES = Path(__file__).with_name("perfiles_imagenes.json")
EXTENSIONES_RASTER = {".png", ".jpg", ".jpeg"}


def cargar_perfiles() -> dict:
    return json.loads(RUTA_PERFILES.read_text(encoding="utf-8"))


def dimension_objetivo(ancho: int, alto: int, ruta: str, perfiles: dict | None = None) -> tuple[int, int]:
    perfiles = perfiles or cargar_perfiles()
    ruta_normalizada = ruta.replace("\\", "/")
    if any(fragmento in ruta_normalizada for fragmento in perfiles["excluir"]):
        return ancho, alto
    limite = perfiles["lado_mayor_predeterminado"]
    for regla in perfiles["reglas"]:
        if ruta_normalizada.startswith(regla["prefijo"]):
            limite = regla["lado_mayor"]
            break
    lado_mayor = max(ancho, alto)
    if lado_mayor <= limite:
        return ancho, alto
    escala = limite / lado_mayor
    return max(1, round(ancho * escala)), max(1, round(alto * escala))


def tiene_alfa(imagen: Image.Image) -> bool:
    return "A" in imagen.getbands() or imagen.mode == "P" and "transparency" in imagen.info


def ruta_derivada(ruta_origen: Path) -> Path:
    relativa = ruta_origen.relative_to(RAIZ_PROYECTO / "assets")
    return RAIZ_PROYECTO / "assets" / "web" / relativa.with_suffix(".webp")


def generar_derivado(ruta_origen: Path, perfiles: dict) -> tuple[Path, int, int, int, int]:
    with Image.open(ruta_origen) as abierta:
        imagen = ImageOps.exif_transpose(abierta)
        ancho_antes, alto_antes = imagen.size
        ruta_relativa = ruta_origen.relative_to(RAIZ_PROYECTO).as_posix()
        ancho_despues, alto_despues = dimension_objetivo(ancho_antes, alto_antes, ruta_relativa, perfiles)
        if (ancho_despues, alto_despues) != imagen.size:
            imagen = imagen.resize((ancho_despues, alto_despues), Image.Resampling.LANCZOS)
        opciones = {"format": "WEBP", "method": 6, "quality": perfiles["calidad_alfa"] if tiene_alfa(imagen) else perfiles["calidad_rgb"]}
        if tiene_alfa(imagen):
            imagen = imagen.convert("RGBA")
        else:
            imagen = imagen.convert("RGB")
        destino = ruta_derivada(ruta_origen)
        destino.parent.mkdir(parents=True, exist_ok=True)
        imagen.save(destino, **opciones)
    return destino, ancho_antes, alto_antes, ancho_despues, alto_despues


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera los derivados WebP del portal.")
    parser.add_argument("--limite", type=int, default=0, help="Procesa solo N archivos para una prueba; 0 procesa todos.")
    argumentos = parser.parse_args()
    perfiles = cargar_perfiles()
    origenes = [
        archivo for archivo in sorted((RAIZ_PROYECTO / "assets" / "img").rglob("*"))
        if archivo.is_file() and archivo.suffix.lower() in EXTENSIONES_RASTER
        and not any(fragmento in archivo.relative_to(RAIZ_PROYECTO).as_posix() for fragmento in perfiles["excluir"])
    ]
    if argumentos.limite:
        origenes = origenes[:argumentos.limite]
    total_antes = total_despues = 0
    for origen in origenes:
        destino, ancho_antes, alto_antes, ancho_despues, alto_despues = generar_derivado(origen, perfiles)
        total_antes += origen.stat().st_size
        total_despues += destino.stat().st_size
        print(f"{origen.relative_to(RAIZ_PROYECTO)} -> {destino.relative_to(RAIZ_PROYECTO)} | {ancho_antes}x{alto_antes} -> {ancho_despues}x{alto_despues}")
    ahorro = 100 * (1 - total_despues / total_antes) if total_antes else 0
    print(f"Procesados: {len(origenes)} | {total_antes / 1024 / 1024:.2f} MiB -> {total_despues / 1024 / 1024:.2f} MiB | ahorro {ahorro:.1f}%")


if __name__ == "__main__":
    main()
