var universidadeModel = require("../models/universidadeModel");

function gerarToken() {
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var token = "";
    for (var i = 0; i < 6; i++) {
        token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return token;
}

function cadastrar(req, res) {
    var cnpj         = req.body.cnpjServer;
    var razaoSocial  = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var email        = req.body.emailServer;

    if (!cnpj)         return res.status(400).send("CNPJ está undefined!");
    if (!razaoSocial)  return res.status(400).send("Razão Social está undefined!");
    if (!nomeFantasia) return res.status(400).send("Nome Fantasia está undefined!");
    if (!email)        return res.status(400).send("Email está undefined!");

    var token = gerarToken();

    universidadeModel.cadastrar(cnpj, razaoSocial, nomeFantasia, email, token)
        .then(function (resultado) {
            res.status(201).json({ token: token });
        })
        .catch(function (erro) {
            console.log("Erro ao cadastrar universidade:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { cadastrar };