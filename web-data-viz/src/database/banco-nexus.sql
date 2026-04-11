CREATE DATABASE NEXUS;
USE NEXUS;

-- TABELAS
CREATE TABLE Universidade (
    idUniversidade       INT PRIMARY KEY AUTO_INCREMENT,
    cnpj                 VARCHAR(18)  NOT NULL UNIQUE,
    razaoSocial          VARCHAR(45)  NOT NULL,
    nomeFantasia         VARCHAR(45)  NOT NULL,
    emailUniversidade    VARCHAR(45)  NOT NULL UNIQUE,
    token                CHAR(6)      NOT NULL  -- gerado no back ao cadastrar
);

CREATE TABLE Diretoria (
    idDiretoria        INT PRIMARY KEY AUTO_INCREMENT,
    nomeDiretoria      VARCHAR(45)  NOT NULL,
    sobrenomeDiretoria VARCHAR(45)  DEFAULT NULL,
    emailDiretoria     VARCHAR(45)  NOT NULL UNIQUE,
    senha              VARCHAR(255) NOT NULL,
    token              CHAR(6)      NOT NULL,
    fkUniversidade     INT          NOT NULL,
        FOREIGN KEY (fkUniversidade) REFERENCES Universidade(idUniversidade)
);

CREATE TABLE Endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(45),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    numero VARCHAR(45),
    estado VARCHAR(45),
    fkUniversidade INT,
		FOREIGN KEY (fkUniversidade) REFERENCES Universidade (idUniversidade)
);

CREATE TABLE Aluno (
	RA INT PRIMARY KEY AUTO_INCREMENT,
    nomeAluno VARCHAR(45),
    sobrenomeAluno VARCHAR(45),
    cpfAluno VARCHAR(11),
    sexo VARCHAR(1),
    emailAluno VARCHAR(45),
    CONSTRAINT chk_sexo CHECK (sexo IN ('F', 'M', 'O'))
);

CREATE TABLE Curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nomeCurso VARCHAR(45),
    modalidade VARCHAR(45),
    mensalidade DECIMAL(6,2),
    periodo VARCHAR(20),
    fkUniversidade INT,
        FOREIGN KEY (fkUniversidade) REFERENCES Universidade (idUniversidade)
);

CREATE TABLE Disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nomeDisciplina VARCHAR(45),
    cargaHoraria VARCHAR(45),
    fkCurso INT,
        FOREIGN KEY (fkCurso) REFERENCES Curso (idCurso)
);

CREATE TABLE Pagamento (
    idPagamento INT PRIMARY KEY AUTO_INCREMENT,
    mesReferencia DATE,
    valor DECIMAL(6,2),
    statusPagamento VARCHAR(45),
    fkAluno INT,
        FOREIGN KEY (fkAluno) REFERENCES Aluno (RA),
    CONSTRAINT chk_statusPagamento CHECK (statusPagamento IN ('Pago', 'Pendente', 'Atrasado'))
);

CREATE TABLE IndicadorRisco (
    idIndicadorRisco INT PRIMARY KEY AUTO_INCREMENT,
    score DECIMAL (5,2),
    nivel VARCHAR(20),
    dataCalculo DATE,
    fkAluno INT,
        FOREIGN KEY (fkAluno) REFERENCES Aluno (RA),
    CONSTRAINT chk_nivel CHECK (nivel IN ('Baixo', 'Medio', 'Alto'))
);

CREATE TABLE Matricula (
    idMatricula INT PRIMARY KEY AUTO_INCREMENT,
    fkCurso INT,
        FOREIGN KEY (fkCurso) REFERENCES Curso (idCurso),
    fkAluno INT,
        FOREIGN KEY (fkAluno) REFERENCES Aluno (RA),
    data_ingresso DATE,
    evadiu TINYINT,
		CONSTRAINT chk_evadiu CHECK (evadiu IN (0, 1)),
	motivoEvasao VARCHAR(45),
    dataEvasao DATE
);

CREATE TABLE Historico (
    idHistorico INT PRIMARY KEY AUTO_INCREMENT,
    fkAluno INT,
        FOREIGN KEY (fkAluno) REFERENCES Aluno (RA),
    fkDisciplina INT,
        FOREIGN KEY (fkDisciplina) REFERENCES Disciplina (idDisciplina),
    semestre INT,
    nota DECIMAL(3,2),
    frequencia DECIMAL(5,2)
);

CREATE TABLE Logs(
	idLogs INT PRIMARY KEY AUTO_INCREMENT,
    mensagem VARCHAR(250),
    dataHora DATETIME
);
