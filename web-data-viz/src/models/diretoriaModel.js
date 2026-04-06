var database = require("../database/config");

function buscarUniversidadePorToken(token) {
    var instrucaoSql = `
        SELECT idUniversidade FROM Universidade WHERE token = '${token}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, sobrenome, email, senha, token, fkUniversidade) {
    var instrucaoSql = `
        INSERT INTO Diretoria (nomeDiretoria, sobrenomeDiretoria, emailDiretoria, senha, token, fkUniversidade)
        VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${token}', '${fkUniversidade}');
    `;
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("Autenticando diretor:", email);
    var instrucaoSql = `
        SELECT idDiretoria, nomeDiretoria, sobrenomeDiretoria, emailDiretoria, fkUniversidade
        FROM Diretoria
        WHERE emailDiretoria = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { buscarUniversidadePorToken, cadastrar, autenticar };