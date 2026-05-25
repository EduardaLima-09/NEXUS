var express = require("express");
var router = express.Router();

var metasController = require("../controllers/metasController");

router.post("/cadastrar", function (req, res) {
    metasController.cadastrar(req, res);
});

router.put("/editar/:id", function (req, res) {
    metasController.editar(req, res);
});

router.delete("/excluir/:id", function (req, res) {
    metasController.excluir(req, res);
});

router.get("/listar", function (req, res) {
    metasController.listar(req, res);
});

router.get("/listar-professor", function (req, res) {
    metasController.listarParaProfessor(req, res);
});

module.exports = router;