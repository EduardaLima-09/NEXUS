var express = require("express");
var router = express.Router();

var alunosController = require("../controllers/alunosController");

router.get("/kpis-risco", function (req, res) {
    alunosController.buscarKpisRisco(req, res);
});

router.get("/listar", function (req, res) {
    alunosController.buscarAlunos(req, res);
});

router.get("/cursos-filtro", function (req, res) {
    alunosController.buscarCursosFiltro(req, res);
});

router.get("/semestres-filtro", function (req, res) {
    alunosController.buscarSemestresFiltro(req, res);
});

module.exports = router;