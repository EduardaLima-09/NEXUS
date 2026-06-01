var database = require("../database/config");

function buscarKpis(fkUniversidade) {

    var instrucaoSql = `
        SELECT 
            COUNT(DISTINCT a.RA) AS totalAlunos,

            SUM(
                CASE
                    WHEN ir.score >= 75 THEN 1
                    ELSE 0
                END
            ) AS alunosRisco,

            (
                SELECT c.nome
                FROM Curso c
                JOIN Historico h ON h.fkCurso = c.id
                JOIN IndicadorRisco ir2 
                    ON ir2.fkAluno = h.fkAluno
                WHERE c.fkUniversidade = '${fkUniversidade}'
                GROUP BY c.id
                ORDER BY SUM(
                    CASE
                        WHEN ir2.score >= 75 THEN 1
                        ELSE 0
                    END
                ) DESC
                LIMIT 1
            ) AS cursoMaisRisco

        FROM Curso c
        JOIN Historico h 
            ON h.fkCurso = c.id
        JOIN Aluno a 
            ON a.RA = h.fkAluno
        LEFT JOIN IndicadorRisco ir 
            ON ir.fkAluno = a.RA
        WHERE c.fkUniversidade = '${fkUniversidade}';
    `;

    return database.executar(instrucaoSql);

}

function buscarGraficoMedia(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            semestre,
            ROUND(AVG(nota), 1) AS media
        FROM Historico h
        JOIN Curso c 
            ON c.id = h.fkCurso
        WHERE c.fkUniversidade = '${fkUniversidade}'
        GROUP BY semestre
        ORDER BY semestre;
    `;

    return database.executar(instrucaoSql);

}

function buscarTopCursos(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            c.nome,
            COUNT(DISTINCT h.fkAluno) AS quantidade
        FROM Curso c
        JOIN Historico h 
            ON h.fkCurso = c.id
        WHERE c.fkUniversidade = '${fkUniversidade}'
        GROUP BY c.id
        ORDER BY quantidade DESC
        LIMIT 5;
    `;

    return database.executar(instrucaoSql);

}

function buscarMediaPorCurso(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            c.nome,
            ROUND(AVG(h.nota), 1) AS media
        FROM Curso c
        JOIN Historico h ON h.fkCurso = c.id
        WHERE c.fkUniversidade = '${fkUniversidade}'
        GROUP BY c.id
        ORDER BY media DESC;
    `;

    return database.executar(instrucaoSql);

}

module.exports = {
    buscarKpis,
    buscarGraficoMedia,
    buscarTopCursos,
    buscarMediaPorCurso
};