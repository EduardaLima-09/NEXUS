var express = require("express");
var router = express.Router();
var diretoriaController = require("../controllers/diretoriaController");

router.post("/cadastrar", function (req, res) {
    diretoriaController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    diretoriaController.autenticar(req, res);
});

module.exports = router;