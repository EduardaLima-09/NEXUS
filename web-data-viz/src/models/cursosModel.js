var database = require("../database/config");

function verificarCursoExistente(nome, fkUniversidade) {
    const instrucaoSql = `
        SELECT id
        FROM Curso
        WHERE nome = '${nome}'
          AND fkUniversidade = '${fkUniversidade}';
    `;

    return database.executar(instrucaoSql);
}

function cadastrar(nome, fkUniversidade) {
    var instrucaoSql = `
        INSERT INTO Curso (nome, fkUniversidade) VALUES ('${nome}', '${fkUniversidade}');
    `;

    return database.executar(instrucaoSql);
}

function editar(id, nome){

    const instrucaoSql = `
        UPDATE Curso
        SET
            nome = '${nome}'
        WHERE id = ${id};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function excluir(id){

    const instrucaoSql = `
        DELETE FROM Curso
        WHERE id = ${id};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function listarCursos(fkUniversidade){

    const instrucaoSql = `
        SELECT
            id,
            nome
        FROM Curso
        WHERE fkUniversidade = ${fkUniversidade};
    `;

    console.log("SQL:\n" + instrucaoSql);

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
                ORDER BY COUNT(DISTINCT ir.fkAluno) DESC
                LIMIT 1
            ) AS cursoMaiorRisco,

            (
                SELECT COUNT(DISTINCT ir.fkAluno)
                FROM Curso c
                JOIN Historico h ON h.fkCurso = c.id
                JOIN IndicadorRisco ir ON ir.fkAluno = h.fkAluno
                WHERE c.fkUniversidade = ${fkUniversidade}
                AND ir.score >= 70
                GROUP BY c.id
                ORDER BY COUNT(DISTINCT ir.fkAluno) DESC
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
                ORDER BY COUNT(DISTINCT ir.fkAluno) ASC
                LIMIT 1
            ) AS cursoMenorRisco,

            (
                SELECT COUNT(DISTINCT ir.fkAluno)
                FROM Curso c
                JOIN Historico h ON h.fkCurso = c.id
                JOIN IndicadorRisco ir ON ir.fkAluno = h.fkAluno
                WHERE c.fkUniversidade = ${fkUniversidade}
                AND ir.score >= 70
                GROUP BY c.id
                ORDER BY COUNT(DISTINCT ir.fkAluno) ASC
                LIMIT 1
            ) AS qtdMenorRisco,

            (
                SELECT COUNT(DISTINCT h2.fkAluno)
                FROM Historico h2
                JOIN Curso c2 ON c2.id = h2.fkCurso
                WHERE c2.fkUniversidade = ${fkUniversidade}
            ) AS totalAlunos;
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
                    WHEN ir.score > 40
                    AND ir.score < 70 THEN 1
                    ELSE 0
                END
            ) AS medio,

            SUM(
                CASE
                    WHEN ir.score <= 40 THEN 1
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

            COUNT(DISTINCT h.fkAluno) AS totalAlunos,

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
            ) AS semestreCritico,

            ROUND(
                (
                    SUM(
                        CASE
                            WHEN ir.score >= 70 THEN 1
                            ELSE 0
                        END
                    ) * 100.0
                ) / COUNT(DISTINCT h.fkAluno),
                1
                ) AS percentualRisco

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
    verificarCursoExistente,
    cadastrar,
    editar,
    excluir,
    listarCursos,
    buscarKpis,
    buscarGrafico,
    buscarListaCursos
};