DROP DATABASE NEXUS;

CREATE DATABASE NEXUS;
USE NEXUS;

-- TABELAS
CREATE TABLE Universidade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    razaoSocial VARCHAR(45) NOT NULL,
    nomeFantasia VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    token CHAR(6) NOT NULL DEFAULT ''
);

CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45) DEFAULT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    token CHAR(6) NOT NULL,
    cargo VARCHAR(45),
    CONSTRAINT chk_cargo CHECK (cargo IN('Coordenador', 'Professor')),
    fkUniversidade INT NOT NULL,
        FOREIGN KEY (fkUniversidade) REFERENCES Universidade(id)
);

CREATE TABLE Aluno (
    RA INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    sobrenome VARCHAR(45),
    cpf VARCHAR(11),
    sexo VARCHAR(1),
    email VARCHAR(45),
    CONSTRAINT chk_sexo CHECK (sexo IN ('F', 'M', 'O'))
);

CREATE TABLE Curso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    modalidade VARCHAR(45),
    fkUniversidade INT,
        FOREIGN KEY (fkUniversidade) REFERENCES Universidade (id)
);

CREATE TABLE IndicadorRisco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    score DECIMAL (5,2),
    nivel VARCHAR(20),
    dataCalculo DATE,
    fkAluno INT,
        FOREIGN KEY (fkAluno) REFERENCES Aluno (RA),
    CONSTRAINT chk_nivel CHECK (nivel IN ('Baixo', 'Medio', 'Alto'))
);

CREATE TABLE Historico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkAluno INT,
        FOREIGN KEY (fkAluno) REFERENCES Aluno (RA),
    semestre INT,
    nota DECIMAL(5,2),
    frequencia DECIMAL(5,2),
    fkCurso INT,
        FOREIGN KEY (fkCurso) REFERENCES Curso (id)
);

CREATE TABLE Logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mensagem VARCHAR(250),
    dataHora DATETIME
);

SELECT * FROM usuario;

SELECT * FROM universidade;




-- UNIVERSIDADE
INSERT INTO Universidade (cnpj, razaoSocial, nomeFantasia, email, token) VALUES
('12.345.678/0001-90', 'Universidade Paulista LTDA', 'UNIPaulista', 'contato@unipaulista.com', 'ABC123'),
('98.765.432/0001-10', 'Centro Universitario Nexus', 'Nexus University', 'admin@nexusuni.com', 'XYZ789');

-- USUARIO
INSERT INTO Usuario (nome, sobrenome, email, senha, token, cargo, fkUniversidade) VALUES
('Maria', 'Silva', 'maria.silva@nexus.com', '123456', 'TOK001', 'Coordenador', 1),
('Joao', 'Souza', 'joao.souza@nexus.com', '123456', 'TOK002', 'Professor', 1),
('Ana', 'Costa', 'ana.costa@nexus.com', '123456', 'TOK003', 'Professor', 2),
('Carlos', 'Oliveira', 'carlos.oliveira@nexus.com', '123456', 'TOK004', 'Coordenador', 2);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, cpf, sexo, email) VALUES
('Pedro', 'Lima', '12345678901', 'M', 'pedro.lima@email.com'),
('Julia', 'Mendes', '98765432100', 'F', 'julia.mendes@email.com'),
('Lucas', 'Ferreira', '45678912300', 'M', 'lucas.ferreira@email.com'),
('Beatriz', 'Almeida', '78912345600', 'F', 'beatriz.almeida@email.com'),
('Alex', 'Rocha', '32165498700', 'O', 'alex.rocha@email.com');

-- CURSO
INSERT INTO Curso (nome, modalidade, fkUniversidade) VALUES
('Ciencia da Computacao', 'Presencial', 1),
('Sistemas de Informacao', 'EAD', 1),
('Engenharia de Software', 'Presencial', 2),
('Analise e Desenvolvimento de Sistemas', 'Hibrido', 2);

-- INDICADOR DE RISCO
INSERT INTO IndicadorRisco (score, nivel, dataCalculo, fkAluno) VALUES
(20.50, 'Baixo', '2026-05-20', 1),
(55.80, 'Medio', '2026-05-20', 2),
(82.30, 'Alto', '2026-05-20', 3),
(40.00, 'Medio', '2026-05-20', 4),
(15.75, 'Baixo', '2026-05-20', 5);

-- HISTORICO
INSERT INTO Historico (fkAluno, semestre, nota, frequencia, fkCurso) VALUES
(1, 1, 8.5, 92.0, 1),
(1, 2, 7.8, 88.5, 1),
(2, 1, 6.2, 75.0, 2),
(3, 1, 5.5, 68.0, 3),
(4, 2, 9.0, 95.0, 4),
(5, 1, 8.8, 97.0, 2);

-- LOGS
INSERT INTO Logs (mensagem, dataHora) VALUES
('Usuario Maria realizou login', NOW()),
('Novo aluno cadastrado', NOW()),
('Indicador de risco atualizado', NOW()),
('Professor acessou dashboard', NOW());