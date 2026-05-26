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
    dataHora DATETIME,
    status VARCHAR(45)
);

CREATE TABLE Meta(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    porcentagem INT,
    fkCurso INT,
		FOREIGN KEY (fkCurso) REFERENCES Curso (id),
	fkUniversidade INT,
		FOREIGN KEY (fkUniversidade) REFERENCES Universidade (id)
);

SELECT * FROM usuario;
SELECT *  FROM aluno;
SELECT * FROM universidade;


SELECT * FROM Meta;



-- 1. Inserir Universidade
INSERT INTO Universidade (cnpj, razaoSocial, nomeFantasia, email, token) VALUES
('12.345.678/0001-90', 'Nexus Educacional LTDA', 'Nexus University', 'contato@nexus.edu', 'ABC123');

-- 2. Inserir Usuários
INSERT INTO Usuario (nome, sobrenome, email, senha, token, cargo, fkUniversidade) VALUES
('João', 'Silva', 'joao.silva@nexus.edu', 'senha123', 'GHI789', 'Coordenador', 1),
('Maria', 'Oliveira', 'maria.oliveira@nexus.edu', 'senha456', 'GHI789', 'Professor', 1);

-- 3. Inserir Cursos
INSERT INTO Curso (nome, fkUniversidade) VALUES
('Ciência da Computação', 1),
('Sistemas de Informação', 1);

-- 4. Inserir Alunos
INSERT INTO Aluno (nome, sobrenome, cpf, sexo, email) VALUES
('Carlos', 'Andrade', '12345678901', 'M', 'carlos.andrade@aluno.edu'),
('Ana', 'Beatriz', '23456789012', 'F', 'ana.beatriz@aluno.edu'),
('Pedro', 'Henrique', '34567890123', 'M', 'pedro.henrique@aluno.edu'),
('Fernanda', 'Lima', '45678901234', 'F', 'fernanda.lima@aluno.edu');



