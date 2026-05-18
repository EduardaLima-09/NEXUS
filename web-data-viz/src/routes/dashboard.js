var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/kpis", function (req, res) {
    dashboardController.buscarKpis(req, res);
});

router.get("/grafico-media", function (req, res) {
    dashboardController.buscarGraficoMedia(req, res);
});

router.get("/top-cursos", function (req, res) {
    dashboardController.buscarTopCursos(req, res);
});

router.get("/turnos", function (req, res) {
    dashboardController.buscarTurnos(req, res);
});

module.exports = router;