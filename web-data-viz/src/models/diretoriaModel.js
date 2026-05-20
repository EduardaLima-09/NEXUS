var database = require("../database/config");

function buscarUniversidadePorToken(token) {
    var instrucaoSql = `
        SELECT id, token
        FROM Universidade
        WHERE token = '${token}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, sobrenome, email, senha, token, cargo, fkUniversidade) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, sobrenome, email, senha, token, cargo, fkUniversidade)
        VALUES (
            '${nome}',
            '${sobrenome}',
            '${email}',
            '${senha}',
            '${token}',
            '${cargo}',
            '${fkUniversidade}'
        );
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
        ORDER BY nome;
    `;
    return database.executar(instrucaoSql);
}

function atualizarUsuario(id, nome, sobrenome, email, cargo, fkUniversidade) {
    var instrucaoSql = `
        UPDATE Usuario
        SET
            nome = '${nome}',
            sobrenome = '${sobrenome}',
            email = '${email}',
            cargo = '${cargo}'
        WHERE id = '${id}'
          AND fkUniversidade = '${fkUniversidade}';
    `;
    return database.executar(instrucaoSql);
}

function deletar(id, fkUniversidade) {
    var instrucaoSql = `
        DELETE FROM Usuario
        WHERE id = '${id}'
          AND fkUniversidade = '${fkUniversidade}';
    `;
    return database.executar(instrucaoSql);
}

function listarAlunos(fkUniversidade) {
    var instrucaoSql = `
        SELECT
            a.RA,
            a.nome,
            a.sobrenome,
            a.cpf,
            CASE
                WHEN a.sexo = 'M' THEN 'Masculino'
                WHEN a.sexo = 'F' THEN 'Feminino'
                ELSE 'Outro'
            END AS sexo,
            a.email,
            c.nome AS curso
        FROM Aluno a
        LEFT JOIN Historico h ON h.fkAluno = a.RA
        LEFT JOIN Curso c ON c.id = h.fkCurso
        WHERE c.fkUniversidade = '${fkUniversidade}'
        GROUP BY a.RA, c.id
        ORDER BY a.nome;
    `;
    return database.executar(instrucaoSql);
}

function atualizarAluno(ra, nome, sobrenome, cpf, sexo, email) {
    var instrucaoSql = `
        UPDATE Aluno
        SET
            nome = '${nome}',
            sobrenome = '${sobrenome}',
            cpf = '${cpf}',
            sexo = '${sexo}',
            email = '${email}'
        WHERE RA = '${ra}';
    `;
    return database.executar(instrucaoSql);
}

function deletarAluno(ra) {
    var instrucaoSql = `
        DELETE FROM Aluno
        WHERE RA = '${ra}';
    `;
    return database.executar(instrucaoSql);
}

function listarCursos(fkUniversidade) {
    var instrucaoSql = `
        SELECT id, nome, modalidade
        FROM Curso
        WHERE fkUniversidade = '${fkUniversidade}'
        ORDER BY nome;
    `;
    return database.executar(instrucaoSql);
}

function atualizarCurso(id, nome, modalidade, fkUniversidade) {
    var instrucaoSql = `
        UPDATE Curso
        SET
            nome = '${nome}',
            modalidade = '${modalidade}'
        WHERE id = '${id}'
          AND fkUniversidade = '${fkUniversidade}';
    `;
    return database.executar(instrucaoSql);
}

function deletarCurso(id, fkUniversidade) {
    var instrucaoSql = `
        DELETE FROM Curso
        WHERE id = '${id}'
          AND fkUniversidade = '${fkUniversidade}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrarAluno(nome, sobrenome, cpf, sexo, email) {
    var instrucaoSql = `
        INSERT INTO Aluno (nome, sobrenome, cpf, sexo, email)
        VALUES (
            '${nome}',
            '${sobrenome}',
            '${cpf}',
            '${sexo}',
            '${email}'
        );
    `;
    return database.executar(instrucaoSql);
}

function cadastrarCurso(nome, modalidade, fkUniversidade) {
    var instrucaoSql = `
        INSERT INTO Curso (nome, modalidade, fkUniversidade)
        VALUES (
            '${nome}',
            '${modalidade}',
            '${fkUniversidade}'
        );
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUniversidadePorToken,
    cadastrar,
    autenticar,
    listarPorUniversidade,
    atualizarUsuario,
    deletar,
    listarAlunos,
    cadastrarAluno,
    atualizarAluno,
    deletarAluno,
    listarCursos,
    cadastrarCurso,
    atualizarCurso,
    deletarCurso
};