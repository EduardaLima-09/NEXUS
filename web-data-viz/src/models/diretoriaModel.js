var database = require("../database/config");

function buscarUniversidadePorToken(token) {
    var instrucaoSql = `
        SELECT id, token
        FROM Universidade
        WHERE token = '${token}';
    `;

    return database.executar(instrucaoSql);
}

function cadastrar(nome, sobrenome, email, senha, token, fkUniversidade) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, sobrenome, email, senha, token, cargo, fkUniversidade)
        SELECT
            '${nome}',
            '${sobrenome}',
            '${email}',
            '${senha}',
            '${token}',
            CASE
                WHEN contagem.qtdDiretores = 0 THEN 'Diretor'
                ELSE 'Coordenador'
            END,
            '${fkUniversidade}'
        FROM (
            SELECT COUNT(*) AS qtdDiretores
            FROM Usuario
            WHERE fkUniversidade = '${fkUniversidade}'
              AND cargo = 'Diretor'
        ) AS contagem;
    `;

    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("Autenticando usuário:", email);

    var instrucaoSql = `
        SELECT id, nome, sobrenome, email, cargo, fkUniversidade
        FROM Usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUniversidade(fkUniversidade) {
    var instrucaoSql = `
        SELECT id, nome, sobrenome, email, token, cargo
        FROM Usuario
        WHERE fkUniversidade = '${fkUniversidade}'
        ORDER BY
            CASE
                WHEN cargo = 'Diretor' THEN 0
                ELSE 1
            END,
            nome;
    `;

    return database.executar(instrucaoSql);
}

function deletar(id, fkUniversidade) {
    var instrucaoSql = `
        DELETE FROM Usuario
        WHERE id = '${id}'
          AND fkUniversidade = '${fkUniversidade}'
          AND cargo = 'Coordenador';
    `;

    return database.executar(instrucaoSql);
}

module.exports = { buscarUniversidadePorToken, cadastrar, autenticar, listarPorUniversidade, deletar };
