var express = require("express");
var router = express.Router();

var cursosController = require("../controllers/cursosController");

router.post("/cadastrar", function(req, res){
    cursosController.cadastrar(req, res);
});

router.put("/editar/:id", function(req, res){
    cursosController.editar(req, res);
});

router.delete("/excluir/:id", function(req, res){
    cursosController.excluir(req, res);
});

router.get("/listar", function(req, res){
    cursosController.listarCursos(req, res);
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