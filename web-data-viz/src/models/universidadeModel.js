var database = require("../database/config");

function cadastrar(cnpj, razaoSocial, nomeFantasia, email, token) {
    console.log("Cadastrando universidade:", nomeFantasia);

    var instrucaoSql = `
        INSERT INTO Universidade (cnpj, razaoSocial, nomeFantasia, email, token)
        VALUES ('${cnpj}', '${razaoSocial}', '${nomeFantasia}', '${email}', '${token}');
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorToken(token) {
    var instrucaoSql = `
        SELECT id, token
        FROM Universidade
        WHERE token = '${token}';
    `;

    return database.executar(instrucaoSql);
}

module.exports = { cadastrar, buscarPorToken };
