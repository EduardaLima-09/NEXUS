// models/alunosModel.js

var database = require("../database/config");

function buscarKpis(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            SUM(
                CASE
                    WHEN ir.score BETWEEN 0 AND 39 THEN 1
                    ELSE 0
                END
            ) AS baixo,

            SUM(
                CASE
                    WHEN ir.score BETWEEN 40 AND 69 THEN 1
                    ELSE 0
                END
            ) AS medio,

            SUM(
                CASE
                    WHEN ir.score BETWEEN 70 AND 100 THEN 1
                    ELSE 0
                END
            ) AS alto

        FROM IndicadorRisco ir

        INNER JOIN Aluno a
            ON a.RA = ir.fkAluno

        INNER JOIN Historico h
            ON h.fkAluno = a.RA

        INNER JOIN Curso c
            ON c.id = h.fkCurso

        WHERE c.fkUniversidade = ${fkUniversidade};
    `;

    return database.executar(instrucaoSql);
}

function buscarDistribuicaoRisco(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            CASE
                WHEN ir.score BETWEEN 0 AND 39 THEN 'Baixo'
                WHEN ir.score BETWEEN 40 AND 69 THEN 'Médio'
                WHEN ir.score BETWEEN 70 AND 100 THEN 'Alto'
            END AS nivelRisco,

            COUNT(*) AS quantidade

        FROM IndicadorRisco ir

        INNER JOIN Aluno a
            ON a.RA = ir.fkAluno

        INNER JOIN Historico h
            ON h.fkAluno = a.RA

        INNER JOIN Curso c
            ON c.id = h.fkCurso

        WHERE c.fkUniversidade = ${fkUniversidade}

        GROUP BY nivelRisco;
    `;

    return database.executar(instrucaoSql);
}

function listarAlunos(
    fkUniversidade,
    pesquisa,
    curso,
    semestre,
    risco,
    nota
) {

    var filtroCurso = "";
    var filtroSemestre = "";
    var filtroRisco = "";
    var filtroNota = "";
    var filtroPesquisa = "";

    if (curso != "") {
        filtroCurso = ` AND c.nome = '${curso}' `;
    }

    if (semestre != "") {
        filtroSemestre = ` AND h.semestre = '${semestre}' `;
    }

    if (pesquisa != "") {
        filtroPesquisa = `
            AND CONCAT(a.nome, ' ', a.sobrenome)
            LIKE '%${pesquisa}%'
        `;
    }

    if (risco != "") {

        if (risco == "Baixo") {
            filtroRisco = ` AND ir.score BETWEEN 0 AND 39 `;
        }

        if (risco == "Médio") {
            filtroRisco = ` AND ir.score BETWEEN 40 AND 69 `;
        }

        if (risco == "Alto") {
            filtroRisco = ` AND ir.score BETWEEN 70 AND 100 `;
        }
    }

    if (nota != "") {

        if (nota == "alta") {
            filtroNota = ` AND h.nota > 8 `;
        }

        if (nota == "media") {
            filtroNota = ` AND h.nota BETWEEN 6 AND 8 `;
        }

        if (nota == "baixa") {
            filtroNota = ` AND h.nota < 6 `;
        }
    }

    var instrucaoSql = `
        SELECT
            a.RA,
            CONCAT(a.nome, ' ', a.sobrenome) AS aluno,
            c.nome AS curso,
            h.semestre,
            ROUND((100 - h.frequencia), 1) AS faltas,
            ROUND(h.nota, 1) AS mediaAtual,

            CASE
                WHEN ir.score BETWEEN 0 AND 39 THEN 'Baixo'
                WHEN ir.score BETWEEN 40 AND 69 THEN 'Médio'
                WHEN ir.score BETWEEN 70 AND 100 THEN 'Alto'
            END AS risco

        FROM Aluno a

        INNER JOIN Historico h
            ON h.fkAluno = a.RA

        INNER JOIN Curso c
            ON c.id = h.fkCurso

        INNER JOIN IndicadorRisco ir
            ON ir.fkAluno = a.RA

        WHERE c.fkUniversidade = ${fkUniversidade}

        ${filtroPesquisa}
        ${filtroCurso}
        ${filtroSemestre}
        ${filtroRisco}
        ${filtroNota}

        ORDER BY a.RA DESC

        LIMIT 10;
    `;

    return database.executar(instrucaoSql);
}

function buscarFiltros(fkUniversidade) {

    var instrucaoSql = `
        SELECT DISTINCT nome
        FROM Curso
        WHERE fkUniversidade = ${fkUniversidade}
        ORDER BY nome;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpis,
    buscarDistribuicaoRisco,
    listarAlunos,
    buscarFiltros
};