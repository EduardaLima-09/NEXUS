var express = require("express");
var router = express.Router();

var cursosController = require("../controllers/cursosController");

router.post("/cadastrar", function(req, res){
    cursosController.cadastrar(req, res);
});

router.get("/kpis", function (req, res) {
    cursosController.buscarKpis(req, res);
});

router.get("/grafico", function (req, res) {
    cursosController.buscarGrafico(req, res);
});

router.get("/lista", function (req, res) {
    cursosController.buscarListaCursos(req, res);
});

module.exports = router;