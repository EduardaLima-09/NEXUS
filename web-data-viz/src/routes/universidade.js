var express = require("express");
var router = express.Router();
var universidadeController = require("../controllers/universidadeController");

router.post("/cadastrar", function (req, res) {
    universidadeController.cadastrar(req, res);
});

module.exports = router;