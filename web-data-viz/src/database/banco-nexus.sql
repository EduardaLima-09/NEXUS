
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
    CONSTRAINT chk_cargo CHECK (cargo IN('Diretor', 'Coordenador')),
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

CREATE TABLE Logs(
    id INT PRIMARY KEY AUTO_INCREMENT,
    mensagem VARCHAR(250),
    dataHora DATETIME
);