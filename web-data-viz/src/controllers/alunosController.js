var alunosModel = require("../models/alunosModel");

function buscarKpisRisco(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.buscarKpisRisco(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarAlunos(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.buscarAlunos(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarCursosFiltro(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.buscarCursosFiltro(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarSemestresFiltro(req, res) {

    var fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade) {
        return res.status(400).send("fkUniversidade está undefined!");
    }

    alunosModel.buscarSemestresFiltro(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarMetasRisco(req, res){

    const fkUniversidade = req.query.fkUniversidade;

    if (!fkUniversidade){
        return res.status(400).send("fkUniversidade undefined");
    }

    alunosModel.buscarMetasRisco(fkUniversidade)
        .then(function(resultado){

            res.status(200).json(resultado);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarKpisRisco,
    buscarAlunos,
    buscarCursosFiltro,
    buscarSemestresFiltro,
    buscarMetasRisco
};