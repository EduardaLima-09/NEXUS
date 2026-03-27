var diretoriaModel = require("../models/diretoriaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var token = req.body.tokenServer;
    var senha = req.body.senhaServer;

    if (!nome) return res.status(400).send("Nome está undefined!");
    if (!sobrenome) return res.status(400).send("Sobrenome está undefined!");
    if (!email) return res.status(400).send("Email está undefined!");
    if (!token) return res.status(400).send("Token está undefined!");
    if (!senha) return res.status(400).send("Senha está undefined!");

    diretoriaModel.buscarUniversidadePorToken(token)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(404).send("Token inválido! Verifique o token da sua instituição.");
            }

            var fkUniversidade = resultado[0].idUniversidade;

            return diretoriaModel.cadastrar(nome, sobrenome, email, senha, token, fkUniversidade)
                .then(function (resultadoCadastro) {
                    res.status(201).json(resultadoCadastro);
                });
        })
        .catch(function (erro) {
            console.log("Erro ao cadastrar diretor:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) return res.status(400).send("Email está undefined!");
    if (!senha) return res.status(400).send("Senha está undefined!");

    diretoriaModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(401).send("Email e/ou senha inválidos.");
            }
            if (resultado.length > 1) {
                return res.status(500).send("Mais de um usuário com o mesmo login.");
            }

            var diretor = resultado[0];
            res.status(200).json({
                id: diretor.idDiretoria,
                nome: diretor.nomeDiretoria,
                sobrenome: diretor.sobrenomeDiretoria,
                email: diretor.emailDiretoria,
                universidade: diretor.fkUniversidade
            });
        })
        .catch(function (erro) {
            console.log("Erro ao autenticar:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { cadastrar, autenticar };