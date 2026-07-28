import unittest
from pathlib import Path


class ReferenciasCssTests(unittest.TestCase):
    def test_imagen_del_core_usa_ruta_relativa_a_css(self):
        contenido = (Path(__file__).resolve().parents[1] / "js" / "main.js").read_text(encoding="utf-8")
        self.assertIn('`url("../${coreLogoUrl}")`', contenido)

    def test_bca_reconcilia_clave_webp_con_configuracion_original(self):
        contenido = (Path(__file__).resolve().parents[1] / "js" / "bca.js").read_text(encoding="utf-8")
        esperado = '.replace(/\\.webp$/, ".png")'
        self.assertIn(esperado, contenido)


if __name__ == "__main__":
    unittest.main()
