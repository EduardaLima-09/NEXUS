var cursosModel = require("../models/cursosModel");

function cadastrar(req, res){

    var nome = req.body.nomeServer;
    var fkUniversidade = req.body.fkUniversidadeServer;

    if (!nome || !fkUniversidade){

        res.status(400).send("Dados inválidos");
    } else {

        cursosModel.cadastrar(
            nome,
            fkUniversidade
        )
        .then(function (resultado){
            
            res.json(resultado);
        })
        .catch (function(erro){

            console.log(erro);

            res.status(500).json(erro.sqlMessage);
        });
    }
}

function editar(req, res){

    const id = req.params.id;

    const nome = req.body.nomeServer;

    cursosModel.editar(id, nome)
        .then(function(resultado){
            res.status(200).send("Curso atualizado");
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function excluir(req, res){

    const id = req.params.id;

    cursosModel.excluir(id)
        .then(function(resultado){
            res.status(200).send("Curso excluido");
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarCursos(req, res){

    const fkUniversidade = req.query.fkUniversidade;

    if(!fkUniversidade){
        return res.status(400).send("fkUniversidade undefined");
    }

    cursosModel.listarCursos(fkUniversidade)
        .then(function(resultado){

            res.status(200).json(resultado);
        })
        .catch(function(erro){

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