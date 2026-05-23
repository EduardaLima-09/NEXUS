var database = require("../database/config");

function cadastrar(
    titulo,
    categoria,
    porcentagem,
    fkCurso,
    fkUniversidade
) {

    var instrucaoSql = `
        INSERT INTO Meta
        (
            nome,
            categoria,
            porcentagem,
            fkCurso,
            fkUniversidade
        )
        VALUES
        (
            '${titulo}',
            '${categoria}',
            ${porcentagem},
            ${fkCurso},
            ${fkUniversidade}
        );
    `;

    return database.executar(instrucaoSql);
}

function editar(id, nome, categoria, porcentagem, fkCurso){

    const instrucaoSql = `
        UPDATE Meta
        SET
            nome = '${nome}',
            categoria = '${categoria}',
            porcentagem = '${porcentagem}',
            fkCurso = '${fkCurso}'
        WHERE id = ${id};
    `;

    console.log("SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function excluir(id){

    const instrucaoSql = `
        DELETE FROM Meta
        WHERE id = ${id};
    `;

    console.log("SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function listar(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            m.id,
            m.nome,
            m.categoria,
            m.porcentagem,
            c.nome AS curso
        FROM Meta m
        JOIN Curso c
            ON m.fkCurso = c.id
        WHERE m.fkUniversidade = ${fkUniversidade};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    editar,
    excluir,
    listar
};