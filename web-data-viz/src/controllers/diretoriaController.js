var diretoriaModel = require("../models/diretoriaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var token = req.body.tokenServer;
    var senha = req.body.senhaServer;
    var cargo = req.body.cargoServer;

    if (!nome) return res.status(400).send("Nome está undefined!");
    if (!sobrenome) return res.status(400).send("Sobrenome está undefined!");
    if (!email) return res.status(400).send("Email está undefined!");
    if (!token) return res.status(400).send("Token está undefined!");
    if (!senha) return res.status(400).send("Senha está undefined!");
    if (!cargo) return res.status(400).send("Cargo está undefined!");
    if (cargo !== "Coordenador" && cargo !== "Professor") {
        return res.status(400).send("Cargo inválido. Use Coordenador ou Professor.");
    }

    diretoriaModel.buscarUniversidadePorToken(token)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(404).send("Token inválido! Verifique o token da sua instituição.");
            }
            var fkUniversidade = resultado[0].id;
            return diretoriaModel.cadastrar(nome, sobrenome, email, senha, token, cargo, fkUniversidade)
                .then(function () {
                    res.status(201).json({ mensagem: "Cadastro realizado com sucesso." });
                });
        })
        .catch(function (erro) {
            console.log("Erro ao cadastrar usuário:", erro.sqlMessage);
            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Este email já está cadastrado no sistema.");
            }
            res.status(500).json(erro.sqlMessage);
        });
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) return res.status(400).send("Email está undefined!");
    if (!senha) return res.status(400).send("Senha está undefined!");

    diretoriaModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(401).send("Email e/ou senha inválidos.");
            }
            if (resultado.length > 1) {
                return res.status(500).send("Mais de um usuário com o mesmo login.");
            }
            var usuario = resultado[0];
            var redirecionarPara = "/dashboard/alunos.html";
            res.status(200).json({
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                email: usuario.email,
                cargo: usuario.cargo,
                universidade: usuario.fkUniversidade,
                redirecionarPara: redirecionarPara
            });
        })
        .catch(function (erro) {
            console.log("Erro ao autenticar:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    var fkUniversidade = req.query.fkUniversidade;
    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");

    diretoriaModel.listarPorUniversidade(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizar(req, res) {
    var id = req.params.id;
    var fkUniversidade = req.query.fkUniversidade;
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var cargo = req.body.cargo;

    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");
    if (!nome || !email || !cargo) return res.status(400).send("Campos obrigatórios ausentes.");
    if (cargo !== "Coordenador" && cargo !== "Professor") {
        return res.status(400).send("Cargo inválido.");
    }

    diretoriaModel.atualizarUsuario(id, nome, sobrenome || "-", email, cargo, fkUniversidade)
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).send("Usuário não encontrado.");
            }
            res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
        })
        .catch(function (erro) {
            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Este email já está em uso.");
            }
            res.status(500).json(erro.sqlMessage);
        });
}

function deletar(req, res) {
    var id = req.params.id;
    var fkUniversidade = req.query.fkUniversidade;
    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");

    diretoriaModel.deletar(id, fkUniversidade)
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).send("Usuário não encontrado ou sem permissão.");
            }
            res.status(200).json({ mensagem: "Usuário removido com sucesso." });
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAlunos(req, res) {
    var fkUniversidade = req.query.fkUniversidade;
    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");

    diretoriaModel.listarAlunos(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarAluno(req, res) {
    var ra = req.params.ra;
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var cpf = req.body.cpf;
    var sexo = req.body.sexo;
    var email = req.body.email;

    if (!nome || !sobrenome || !cpf || !sexo || !email) {
        return res.status(400).send("Campos obrigatórios ausentes.");
    }
    if (sexo !== "M" && sexo !== "F" && sexo !== "O") {
        return res.status(400).send("Sexo inválido. Use M, F ou O.");
    }

    diretoriaModel.atualizarAluno(ra, nome, sobrenome, cpf, sexo, email)
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).send("Aluno não encontrado.");
            }
            res.status(200).json({ mensagem: "Aluno atualizado com sucesso." });
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function deletarAluno(req, res) {
    var ra = req.params.ra;

    diretoriaModel.deletarAluno(ra)
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).send("Aluno não encontrado.");
            }
            res.status(200).json({ mensagem: "Aluno removido com sucesso." });
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function listarCursos(req, res) {
    var fkUniversidade = req.query.fkUniversidade;
    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");

    diretoriaModel.listarCursos(fkUniversidade)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarCurso(req, res) {
    var id = req.params.id;
    var fkUniversidade = req.query.fkUniversidade;
    var nome = req.body.nome;
    var modalidade = req.body.modalidade;

    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");
    if (!nome || !modalidade) return res.status(400).send("Campos obrigatórios ausentes.");

    diretoriaModel.atualizarCurso(id, nome, modalidade, fkUniversidade)
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).send("Curso não encontrado.");
            }
            res.status(200).json({ mensagem: "Curso atualizado com sucesso." });
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function deletarCurso(req, res) {
    var id = req.params.id;
    var fkUniversidade = req.query.fkUniversidade;
    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");

    diretoriaModel.deletarCurso(id, fkUniversidade)
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).send("Curso não encontrado.");
            }
            res.status(200).json({ mensagem: "Curso removido com sucesso." });
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarAluno(req, res) {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var cpf = req.body.cpf;
    var sexo = req.body.sexo;
    var email = req.body.email;

    if (!nome || !sobrenome || !cpf || !sexo || !email) {
        return res.status(400).send("Campos obrigatórios ausentes.");
    }
    if (sexo !== "M" && sexo !== "F" && sexo !== "O") {
        return res.status(400).send("Sexo inválido. Use M, F ou O.");
    }

    diretoriaModel.cadastrarAluno(nome, sobrenome, cpf, sexo, email)
        .then(function () {
            res.status(201).json({ mensagem: "Aluno cadastrado com sucesso." });
        })
        .catch(function (erro) {
            console.log(erro);
            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).send("CPF ou email já cadastrado.");
            }
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarCurso(req, res) {
    var fkUniversidade = req.query.fkUniversidade;
    var nome = req.body.nome;
    var modalidade = req.body.modalidade;

    if (!fkUniversidade) return res.status(400).send("fkUniversidade está undefined!");
    if (!nome || !modalidade) return res.status(400).send("Campos obrigatórios ausentes.");

    diretoriaModel.cadastrarCurso(nome, modalidade, fkUniversidade)
        .then(function () {
            res.status(201).json({ mensagem: "Curso cadastrado com sucesso." });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    autenticar,
    listar,
    atualizar,
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