// controllers/alunosController.js

var alunosModel = require("../models/alunosModel");

function buscarKpis(req, res) {
    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.buscarKpis(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDistribuicaoRisco(req, res) {
    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.buscarDistribuicaoRisco(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAlunos(req, res) {
    var fkUniversidade = req.query.fkUniversidade;

    var pesquisa = req.query.pesquisa || "";
    var curso = req.query.curso || "";
    var semestre = req.query.semestre || "";
    var risco = req.query.risco || "";
    var nota = req.query.nota || "";

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.listarAlunos(
        fkUniversidade,
        pesquisa,
        curso,
        semestre,
        risco,
        nota
    )
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarFiltros(req, res) {
    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.buscarFiltros(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarKpis,
    buscarDistribuicaoRisco,
    listarAlunos,
    buscarFiltros
};