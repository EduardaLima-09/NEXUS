CREATE DATABASE nexus;
USE nexus;

CREATE TABLE diretoria (
	idDiretoria INT PRIMARY KEY AUTO_INCREMENT,
    nomeResponsavel VARCHAR(100),
    cpfResponsavel CHAR(11),
    emailResponsavel VARCHAR(100) UNIQUE CHECK(emailResponsavel LIKE '%@%.%'),
    senha VARCHAR(20)
    );
    
CREATE TABLE universidade (
	idUniversidade INT PRIMARY KEY AUTO_INCREMENT,
 	cnpj CHAR(14),
    nomeUniversidade VARCHAR(100),
    fkDiretoria INT,	
    FOREIGN KEY (fkDiretoria) REFERENCES diretoria(idDiretoria)
	);

CREATE TABLE endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    numero VARCHAR(5),
    estado CHAR(2),
    fkUniversidade INT,
    FOREIGN KEY (fkUniversidade) REFERENCES universidade(idUniversidade)
    );

CREATE TABLE cursos (
	idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nomeCurso VARCHAR(100),
    modalidade VARCHAR(100),
    mensalidade DECIMAL(7,2),
    horario TIME,
    fkUniversidade INT,
    FOREIGN KEY (fkUniversidade) REFERENCES universidade(idUniversidade)
    );
    
CREATE TABLE disciplinas (
	idDisciplina INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(100),
    carga_horaria TIME,
    fkCurso INT,
    FOREIGN KEY (fkCurso) REFERENCES cursos(idCurso)
    );
    
CREATE TABLE alunos (
	ra INT PRIMARY KEY,
    nomeAluno VARCHAR(100),
	cpfAluno CHAR(11),
    sexo CHAR(1) CHECK (sexo IN('M', 'F', 'N', 'O')),
    emailAluno VARCHAR(100)
    );
    
CREATE TABLE matriculas (
	idMatricula INT PRIMARY KEY AUTO_INCREMENT,
    fkCurso INT,
    fkAluno INT, 
    data_ingresso DATE,
    semestre_atual CHAR(5),
    status_aluno VARCHAR(50),
    FOREIGN KEY (fkCurso) REFERENCES cursos(idCurso),
    FOREIGN KEY (fkAluno) REFERENCES alunos(ra)
    );
    
CREATE TABLE historicos (
	idHistorico INT PRIMARY KEY AUTO_INCREMENT,
    fkAluno INT,
    fkDisciplina INT,
    semestre CHAR(5),
    nota DECIMAL(4,2),
    frequencia DECIMAL(5,2),
    FOREIGN KEY (fkAluno) REFERENCES alunos(ra),
    FOREIGN KEY (fkDisciplina) REFERENCES disciplinas(idDisciplina)
    );
    
CREATE TABLE indicadorRisco (
	idIndicador INT PRIMARY KEY AUTO_INCREMENT,
    score DECIMAL(5,2),
    nivel VARCHAR(20),
    data_calculo DATE,
    fkAluno INT,
    FOREIGN KEY (fkAluno) REFERENCES alunos(ra)
    );
    
CREATE TABLE pagamentos (
	idPagamento INT PRIMARY KEY AUTO_INCREMENT,
    mesReferencia DATE,
    valor DECIMAL(7,2),
    statusPagamento VARCHAR(50),
    fkAluno INT,
    FOREIGN KEY (fkAluno) REFERENCES alunos(ra)
    );