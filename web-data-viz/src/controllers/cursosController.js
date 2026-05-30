var cursosModel = require("../models/cursosModel");

function cadastrar(req, res) {

    var nome           = req.body.nomeServer || req.body.nome;
    var fkUniversidade = req.body.fkUniversidadeServer
                      || req.query.fkUniversidade;

    if (!nome || !fkUniversidade) {
        return res.status(400).send("Dados inválidos");
    }

   cursosModel.verificarCursoExistente(nome, fkUniversidade)
    .then(function(resultado) {
        if (resultado.length > 0) {
            return res.status(409).send("Curso já cadastrado.");
        }
        return cursosModel.cadastrar(nome, fkUniversidade);
    })
    .then(function(resultado) {

        if (!resultado) return;

        res.status(201).json(resultado);
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function editar(req, res) {

    const id   = req.params.id;
    const nome = req.body.nomeServer || req.body.nome;

    if (!nome) {
        return res.status(400).send("Nome está undefined!");
    }

    cursosModel.editar(id, nome)
        .then(function (resultado) {
            res.status(200).send("Curso atualizado");
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function excluir(req, res) {

    const id = req.params.id;

    cursosModel.excluir(id)
        .then(function (resultado) {
            res.status(200).send("Curso excluido");
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function listarCursos(req, res) {

    const fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade undefined");
    }

    cursosModel.listarCursos(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarKpis(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    cursosModel.buscarKpis(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarGrafico(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    cursosModel.buscarGrafico(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarListaCursos(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    cursosModel.buscarListaCursos(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

module.exports = {
    cadastrar,
    editar,
    excluir,
    listarCursos,
    buscarKpis,
    buscarGrafico,
    buscarListaCursos
};