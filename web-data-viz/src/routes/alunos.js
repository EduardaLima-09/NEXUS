// routes/alunos.js

var express = require("express");
var router = express.Router();

var alunosController = require("../controllers/alunosController");

router.get("/kpis", function (req, res) {
    alunosController.buscarKpis(req, res);
});

router.get("/distribuicao-risco", function (req, res) {
    alunosController.buscarDistribuicaoRisco(req, res);
});

router.get("/listar", function (req, res) {
    alunosController.listarAlunos(req, res);
});

router.get("/filtros", function (req, res) {
    alunosController.buscarFiltros(req, res);
});

module.exports = router;