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

function editar(req, res){

    const id = req.params.id;

    const titulo = req.body.tituloServer;
    const categoria = req.body.categoriaServer;
    const porcentagem = req.body.porcentagemServer;
    const fkCurso = req.body.fkCursoServer;

    metasModel.editar(id, titulo, categoria, porcentagem, fkCurso)
        .then(function(resultado){
            res.status(200).send("Meta atualizada");
        })
        .catch (function(erro){
            console.log(erro);
            res.status(500).json(sqlMessage);
        });
}

function excluir(req, res){

    const id = req.params.id;

    metasModel.excluir(id)
        .then(function(resultado){
            res.status(200).send("Meta excluida")
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        });
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
    editar,
    excluir,
    listar
};