var database = require("../database/config");

function buscarKpisRisco(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            SUM(CASE WHEN ir.score <= 39 THEN 1 ELSE 0 END) AS baixo,
            SUM(CASE WHEN ir.score BETWEEN 40 AND 69 THEN 1 ELSE 0 END) AS medio,
            SUM(CASE WHEN ir.score >= 70 THEN 1 ELSE 0 END) AS alto
        FROM Aluno a
        JOIN Historico h ON h.fkAluno = a.RA
        JOIN Curso c ON c.id = h.fkCurso
        JOIN IndicadorRisco ir ON ir.fkAluno = a.RA
        WHERE c.fkUniversidade = '${fkUniversidade}';
    `;

    return database.executar(instrucaoSql);

}

function buscarAlunos(fkUniversidade) {

    var instrucaoSql = `
        SELECT
            a.RA,
            CONCAT(a.nome, ' ', a.sobrenome) AS nomeCompleto,
            c.nome AS curso,
            h.semestre,
            ROUND(AVG(h.frequencia), 1) AS faltas,
            ROUND(AVG(h.nota), 1) AS media,
            ir.score,
            CASE
                WHEN ir.score <= 39 THEN 'Baixo'
                WHEN ir.score BETWEEN 40 AND 69 THEN 'Médio'
                ELSE 'Alto'
            END AS risco
        FROM Aluno a
        JOIN Historico h ON h.fkAluno = a.RA
        JOIN Curso c ON c.id = h.fkCurso
        LEFT JOIN IndicadorRisco ir ON ir.fkAluno = a.RA
        WHERE c.fkUniversidade = '${fkUniversidade}'
        GROUP BY a.RA, c.id, h.semestre, ir.score
        ORDER BY ir.score DESC;
    `;

    return database.executar(instrucaoSql);

}

function buscarCursosFiltro(fkUniversidade) {

    var instrucaoSql = `
        SELECT DISTINCT c.id, c.nome
        FROM Curso c
        WHERE c.fkUniversidade = '${fkUniversidade}'
        ORDER BY c.nome;
    `;

    return database.executar(instrucaoSql);

}

function buscarSemestresFiltro(fkUniversidade) {

    var instrucaoSql = `
        SELECT DISTINCT h.semestre
        FROM Historico h
        JOIN Curso c ON c.id = h.fkCurso
        WHERE c.fkUniversidade = '${fkUniversidade}'
        ORDER BY h.semestre;
    `;

    return database.executar(instrucaoSql);

}

function buscarMetasRisco(fkUniversidade){

    const instrucaoSql = `
        SELECT
            categoria,
            porcentagem
        FROM Meta
        WHERE fkUniversidade = ${fkUniversidade};
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpisRisco,
    buscarAlunos,
    buscarCursosFiltro,
    buscarSemestresFiltro,
    buscarMetasRisco
};