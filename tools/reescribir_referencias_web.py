"""Cambia referencias de imágenes originales por sus derivados WebP existentes."""
from __future__ import annotations

import argparse
from pathlib import Path

try:
    from tools.generar_imagenes_web import EXTENSIONES_RASTER, RAIZ_PROYECTO, ruta_derivada
except ModuleNotFoundError:  # ejecución directa: Python añade tools/ a sys.path
    from generar_imagenes_web import EXTENSIONES_RASTER, RAIZ_PROYECTO, ruta_derivada

EXTENSIONES_TEXTO = {".html", ".css", ".js"}
DIRECTORIOS_IGNORADOS = {".git", ".hermes", "assets", "reports", "tests", "tools"}


def ruta_web(ruta: str) -> str:
    prefijo = "assets/img/"
    if not ruta.startswith(prefijo):
        raise ValueError(f"Ruta fuera de assets/img: {ruta}")
    return "assets/web/img/" + str(Path(ruta[len(prefijo):]).with_suffix(".webp")).replace("\\", "/")


def construir_reemplazos() -> dict[str, str]:
    reemplazos: dict[str, str] = {}
    for origen in (RAIZ_PROYECTO / "assets" / "img").rglob("*"):
        if not origen.is_file() or origen.suffix.lower() not in EXTENSIONES_RASTER:
            continue
        destino = ruta_derivada(origen)
        if destino.is_file():
            vieja = origen.relative_to(RAIZ_PROYECTO).as_posix()
            reemplazos[vieja] = ruta_web(vieja)
    return reemplazos


def archivos_de_fuente() -> list[Path]:
    archivos = []
    for archivo in RAIZ_PROYECTO.rglob("*"):
        if not archivo.is_file() or archivo.suffix.lower() not in EXTENSIONES_TEXTO:
            continue
        if any(parte in DIRECTORIOS_IGNORADOS for parte in archivo.relative_to(RAIZ_PROYECTO).parts):
            continue
        archivos.append(archivo)
    return archivos


def reemplazar_en_texto(texto: str, reemplazos: dict[str, str]) -> tuple[str, int]:
    cantidad = 0
    for vieja in sorted(reemplazos, key=len, reverse=True):
        ocurrencias = texto.count(vieja)
        if ocurrencias:
            texto = texto.replace(vieja, reemplazos[vieja])
            cantidad += ocurrencias
    return texto, cantidad


def leer_texto(archivo: Path) -> tuple[str, str]:
    for codificacion in ("utf-8", "utf-8-sig", "cp1252"):
        try:
            return archivo.read_text(encoding=codificacion), codificacion
        except UnicodeDecodeError:
            continue
    raise UnicodeError(f"No se pudo leer texto de {archivo}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Reescribe referencias de imagen hacia assets/web.")
    parser.add_argument("--aplicar", action="store_true", help="Escribe los cambios; por defecto solo informa.")
    argumentos = parser.parse_args()
    reemplazos = construir_reemplazos()
    total = 0
    for archivo in archivos_de_fuente():
        texto, codificacion = leer_texto(archivo)
        actualizado, cantidad = reemplazar_en_texto(texto, reemplazos)
        if not cantidad:
            continue
        total += cantidad
        print(f"{archivo.relative_to(RAIZ_PROYECTO)}: {cantidad} referencia(s)")
        if argumentos.aplicar:
            archivo.write_text(actualizado, encoding=codificacion)

    modo = "aplicadas" if argumentos.aplicar else "detectadas (simulación)"
    print(f"{total} referencia(s) {modo} en {len(reemplazos)} imágenes con derivado.")


if __name__ == "__main__":
    main()
