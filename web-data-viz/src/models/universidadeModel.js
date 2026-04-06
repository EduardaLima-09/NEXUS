var database = require("../database/config");

function cadastrar(cnpj, razaoSocial, nomeFantasia, email, token) {
    console.log("Cadastrando universidade:", nomeFantasia);
    var instrucaoSql = `
        INSERT INTO Universidade (cnpj, razaoSocial, nomeFantasia, emailUniversidade, token)
        VALUES ('${cnpj}', '${razaoSocial}', '${nomeFantasia}', '${email}', '${token}');
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { cadastrar };