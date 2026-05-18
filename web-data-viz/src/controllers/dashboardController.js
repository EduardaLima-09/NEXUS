var dashboardModel = require("../models/dashboardModel");

function buscarKpis(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    dashboardModel.buscarKpis(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarGraficoMedia(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    dashboardModel.buscarGraficoMedia(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarTopCursos(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    dashboardModel.buscarTopCursos(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarTurnos(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    dashboardModel.buscarTurnos(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

module.exports = {
    buscarKpis,
    buscarGraficoMedia,
    buscarTopCursos,
    buscarTurnos
};