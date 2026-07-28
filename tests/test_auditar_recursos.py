import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from tools.auditar_recursos import clasificar_criticidad, reunir_referencias
from tools.generar_imagenes_web import dimension_objetivo
from tools.reescribir_referencias_web import ruta_web


class ClasificarCriticidadTests(unittest.TestCase):
    def test_fondo_del_portal_es_home_inicial(self):
        self.assertEqual(
            clasificar_criticidad("assets/img/Fondos/main-bg.jpg", {"index.html", "css/style.css"}),
            "home-inicial",
        )

    def test_arte_de_galeria_es_diferido(self):
        self.assertEqual(
            clasificar_criticidad(
                "assets/img/Arte y diseño/Diseño/UI PeM - Beta.png", {"arte.html"}
            ),
            "galeria-diferida",
        )

    def test_cursor_es_sprite_ui(self):
        self.assertEqual(
            clasificar_criticidad("assets/img/AM/cursor-mano.png", {"am.html", "js/videojuegos.js"}),
            "sprite-ui",
        )

    def test_reune_ruta_con_espacios_desde_html(self):
        with tempfile.TemporaryDirectory() as temporal:
            raiz = Path(temporal)
            (raiz / "arte.html").write_text(
                '<img src="assets/img/Arte y diseño/Diseño/UI PeM - Beta.png">',
                encoding="utf-8",
            )
            referencias = reunir_referencias(raiz)
        self.assertIn(
            "arte.html",
            referencias["assets/img/Arte y diseño/Diseño/UI PeM - Beta.png"],
        )

    def test_fondo_grande_se_restringe_a_1920_pixeles(self):
        self.assertEqual(
            dimension_objetivo(6000, 4000, "assets/img/Fondos/main-bg.jpg"),
            (1920, 1280),
        )

    def test_cursor_no_se_redimensiona(self):
        self.assertEqual(
            dimension_objetivo(256, 256, "assets/img/AM/cursor-mano.png"),
            (256, 256),
        )

    def test_ruta_web_preserva_directorio_y_cambia_extension(self):
        self.assertEqual(
            ruta_web("assets/img/Arte y diseño/Diseño/UI PeM - Beta.png"),
            "assets/web/img/Arte y diseño/Diseño/UI PeM - Beta.webp",
        )

    def test_reescritor_se_ejecuta_directamente_desde_terminal(self):
        raiz = Path(__file__).resolve().parents[1]
        resultado = subprocess.run(
            [sys.executable, "tools/reescribir_referencias_web.py"],
            cwd=raiz,
            capture_output=True,
            text=True,
        )
        self.assertEqual(resultado.returncode, 0, resultado.stderr)


if __name__ == "__main__":
    unittest.main()
