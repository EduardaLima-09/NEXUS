var metasModel = require("../models/metasModel");

function cadastrar(req, res){

    var titulo = req.body.tituloServer;
    var categoria = req.body.categoriaServer;
    var porcentagem = req.body.porcentagemServer;
    var fkCurso = req.body.fkCursoServer;
    var fkUniversidade = req.body.fkUniversidadeServer;

    if (!titulo || !categoria || !porcentagem || !fkCurso || !fkUniversidade){
        res.status(400).send("Dados inválidos");
    } else {

        metasModel.cadastrar(
            titulo,
            categoria,
            porcentagem,
            fkCurso,
            fkUniversidade
        )
        .then(function(resultado){
            res.json(resultado);
        })
        .catch(function (erro){
            console.log(erro);

            res.status(500).json(erro.sqlMessage);
        });
    }
}

function listar(req, res){

    var fkUniversidade = req.query.fkUniversidade;

    metasModel.listar(fkUniversidade)
        .then(function(resultado){

            res.json(resultado);

        }).catch(function(erro){

            console.log(erro);

            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    listar
};