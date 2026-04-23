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

            var fkUniversidade = resultado[0].id;

            return diretoriaModel.cadastrar(nome, sobrenome, email, senha, token, fkUniversidade)
                .then(function () {
                    res.status(201).json({ mensagem: "Cadastro realizado com sucesso." });
                });
        })
        .catch(function (erro) {
            console.log("Erro ao cadastrar usuário:", erro.sqlMessage);

            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Este email já está cadastrado no sistema.");
            }

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

            var usuario = resultado[0];
            var redirecionarPara = usuario.cargo === "Diretor"
                ? "/dashboard/dashboard.html"
                : "/dashboard/alunos.html";

            res.status(200).json({
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                email: usuario.email,
                cargo: usuario.cargo,
                universidade: usuario.fkUniversidade,
                redirecionarPara: redirecionarPara
            });
        })
        .catch(function (erro) {
            console.log("Erro ao autenticar:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    diretoriaModel.listarPorUniversidade(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function deletar(req, res) {
    var id = req.params.id;
    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    diretoriaModel.deletar(id, fkUniversidade)
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).send("Coordenador não encontrado ou sem permissão.");
            }

            res.status(200).json({ mensagem: "Coordenador removido com sucesso." });
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { cadastrar, autenticar, listar, deletar };
