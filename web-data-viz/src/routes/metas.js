var express = require("express");
var router = express.Router();

var metasController = require("../controllers/metasController");

router.post("/cadastrar", function (req, res){
    metasController.cadastrar(req, res);
});

router.get("/listar", function(req, res){
    metasController.listar(req, res);
});

module.exports = router;