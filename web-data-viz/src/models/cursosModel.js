var database = require("../database/config");

function cadastrar(
    nome,
    fkUniversidade
) {
    var instrucaoSql = `
        INSERT INTO Curso (nome, fkUniversidade) VALUES ('${nome}', '${fkUniversidade}');
    `;

    return database.executar(instrucaoSql);
}

function buscarKpis(fkUniversidade) {

    var instrucaoSql = `

        SELECT

            (
                SELECT c.nome
                FROM Curso c
                JOIN Historico h ON h.fkCurso = c.id
                JOIN IndicadorRisco ir ON ir.fkAluno = h.fkAluno
                WHERE c.fkUniversidade = ${fkUniversidade}
                AND ir.score >= 70
                GROUP BY c.id
                ORDER BY COUNT(ir.id) DESC
                LIMIT 1
            ) AS cursoMaiorRisco,

            (
                SELECT COUNT(*)
                FROM Curso c
                JOIN Historico h ON h.fkCurso = c.id
                JOIN IndicadorRisco ir ON ir.fkAluno = h.fkAluno
                WHERE c.fkUniversidade = ${fkUniversidade}
                AND ir.score >= 70
                GROUP BY c.id
                ORDER BY COUNT(ir.id) DESC
                LIMIT 1
            ) AS qtdMaiorRisco,

            (
                SELECT c.nome
                FROM Curso c
                JOIN Historico h ON h.fkCurso = c.id
                JOIN IndicadorRisco ir ON ir.fkAluno = h.fkAluno
                WHERE c.fkUniversidade = ${fkUniversidade}
                AND ir.score >= 70
                GROUP BY c.id
                ORDER BY COUNT(ir.id) ASC
                LIMIT 1
            ) AS cursoMenorRisco,

            (
                SELECT COUNT(*)
                FROM Curso c
                JOIN Historico h ON h.fkCurso = c.id
                JOIN IndicadorRisco ir ON ir.fkAluno = h.fkAluno
                WHERE c.fkUniversidade = ${fkUniversidade}
                AND ir.score >= 70
                GROUP BY c.id
                ORDER BY COUNT(ir.id) ASC
                LIMIT 1
            ) AS qtdMenorRisco;

    `;

    return database.executar(instrucaoSql);
}

function buscarGrafico(fkUniversidade) {

    var instrucaoSql = `

        SELECT
            c.nome AS curso,

            SUM(
                CASE
                    WHEN ir.score >= 70 THEN 1
                    ELSE 0
                END
            ) AS alto,

            SUM(
                CASE
                    WHEN ir.score >= 40
                    AND ir.score < 70 THEN 1
                    ELSE 0
                END
            ) AS medio,

            SUM(
                CASE
                    WHEN ir.score < 40 THEN 1
                    ELSE 0
                END
            ) AS baixo

        FROM Curso c

        LEFT JOIN Historico h
            ON h.fkCurso = c.id

        LEFT JOIN IndicadorRisco ir
            ON ir.fkAluno = h.fkAluno

        WHERE c.fkUniversidade = ${fkUniversidade}

        GROUP BY c.id

        ORDER BY c.nome;

    `;

    return database.executar(instrucaoSql);
}

function buscarListaCursos(fkUniversidade) {

    var instrucaoSql = `

        SELECT

            c.nome,

            ROUND(AVG(h.nota), 1) AS media,

            ROUND(AVG(h.frequencia), 0) AS presenca,

            SUM(
                CASE
                    WHEN ir.score >= 70 THEN 1
                    ELSE 0
                END
            ) AS emRisco,

            (
                SELECT h2.semestre
                FROM Historico h2
                JOIN IndicadorRisco ir2
                    ON ir2.fkAluno = h2.fkAluno
                WHERE h2.fkCurso = c.id
                GROUP BY h2.semestre
                ORDER BY COUNT(
                    CASE
                        WHEN ir2.score >= 70 THEN 1
                    END
                ) DESC
                LIMIT 1
            ) AS semestreCritico

        FROM Curso c

        LEFT JOIN Historico h
            ON h.fkCurso = c.id

        LEFT JOIN IndicadorRisco ir
            ON ir.fkAluno = h.fkAluno

        WHERE c.fkUniversidade = ${fkUniversidade}

        GROUP BY c.id

        ORDER BY emRisco DESC;

    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarKpis,
    buscarGrafico,
    buscarListaCursos
};