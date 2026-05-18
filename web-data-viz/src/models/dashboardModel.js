var database = require("../database/config");

function buscarKpis(fkUniversidade) {

    var instrucaoSql = `

        SELECT 
            COUNT(DISTINCT a.RA) AS totalAlunos,

            SUM(
                CASE
                    WHEN ir.score >= 70 THEN 1
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
                        WHEN ir2.score >= 70 THEN 1
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

function buscarTurnos(fkUniversidade) {

    var instrucaoSql = `

        SELECT

            ROUND(
                (
                    SUM(
                        CASE
                            WHEN c.modalidade = 'Manhã'
                            THEN 1
                            ELSE 0
                        END
                    ) * 100
                ) / COUNT(*),
                1
            ) AS manha,

            ROUND(
                (
                    SUM(
                        CASE
                            WHEN c.modalidade = 'Tarde'
                            THEN 1
                            ELSE 0
                        END
                    ) * 100
                ) / COUNT(*),
                1
            ) AS tarde,

            ROUND(
                (
                    SUM(
                        CASE
                            WHEN c.modalidade = 'Noite'
                            THEN 1
                            ELSE 0
                        END
                    ) * 100
                ) / COUNT(*),
                1
            ) AS noite,

            ROUND(
                (
                    SUM(
                        CASE
                            WHEN c.modalidade = 'EAD'
                            THEN 1
                            ELSE 0
                        END
                    ) * 100
                ) / COUNT(*),
                1
            ) AS ead

        FROM Curso c

        WHERE c.fkUniversidade = '${fkUniversidade}';

    `;

    return database.executar(instrucaoSql);

}

module.exports = {
    buscarKpis,
    buscarGraficoMedia,
    buscarTopCursos,
    buscarTurnos
};