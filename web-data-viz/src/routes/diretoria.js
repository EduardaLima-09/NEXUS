var express = require("express");
var router = express.Router();
var diretoriaController = require("../controllers/diretoriaController");

router.post("/cadastrar", function (req, res) {
    diretoriaController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    diretoriaController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
    diretoriaController.listar(req, res);
});

router.put("/atualizar/:id", function (req, res) {
    diretoriaController.atualizar(req, res);
});

router.delete("/deletar/:id", function (req, res) {
    diretoriaController.deletar(req, res);
});

router.get("/alunos/listar", function (req, res) {
    diretoriaController.listarAlunos(req, res);
});

router.post("/alunos/cadastrar", function (req, res) {
    diretoriaController.cadastrarAluno(req, res);
});

router.put("/alunos/atualizar/:ra", function (req, res) {
    diretoriaController.atualizarAluno(req, res);
});

router.delete("/alunos/deletar/:ra", function (req, res) {
    diretoriaController.deletarAluno(req, res);
});

router.delete("/cursos/deletar/:id", function (req, res) {
    diretoriaController.deletarCurso(req, res);
});

module.exports = router;