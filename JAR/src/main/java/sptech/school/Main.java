package sptech.school;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

public class Main {

    private static volatile boolean carregando = true;

    public static void main(String[] args) {

        ConexaoBD conexaoBD = new ConexaoBD();
        LeituraExcel leituraExcel = new LeituraExcel();

        List<Curso> cursos = leituraExcel.extrairCursos("BaseDeDados-Nexus.xls");
        List<Aluno> alunos = leituraExcel.extrairAlunos("BaseDeDados-Nexus.xls");

        Thread loadingThread = new Thread(() -> {
            while (carregando) {
                System.out.println("CARREGANDO OUTRAS INFORMAÇÕES...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        loadingThread.start();

        Random random = new Random();

        for (Curso curso : cursos) {
            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Curso (nomeCurso, modalidade, periodo, mensalidade, fkUniversidade) VALUES (?, ?, ?, ?, 1)",
                        curso.getNome(),
                        curso.getModalidade(),
                        curso.getPeriodo(),
                        curso.getMensalidade()
                );
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        for (Aluno aluno : alunos) {

            String nome = "Aluno" + aluno.getId();
            String sobrenome = "Teste" + aluno.getId();
            String cpf = String.format("%011d", random.nextInt(999999999));
            String sexo = random.nextBoolean() ? "M" : "F";
            String email = "aluno" + aluno.getId() + "@gmail.com";

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Aluno (nomeAluno, sobrenomeAluno, cpfAluno, sexo, emailAluno) VALUES (?, ?, ?, ?, ?)",
                        nome, sobrenome, cpf, sexo, email
                );
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        for (int i = 1; i <= cursos.size(); i++) {

            for (int j = 1; j <= 10; j++) {

                try {
                    conexaoBD.getJdbcTemplate().update(
                            "INSERT INTO Disciplina (nomeDisciplina, cargaHoraria, fkCurso) VALUES (?, ?, ?)",
                            "Disciplina " + j,
                            "60h",
                            i
                    );
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        for (int i = 0; i < alunos.size(); i++) {

            Aluno aluno = alunos.get(i);

            int fkAluno = i + 1;
            int fkCurso = (i % cursos.size()) + 1;

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Matricula (fkCurso, fkAluno, data_ingresso, evadiu, motivoEvasao, dataEvasao) VALUES (?, ?, ?, ?, ?, ?)",
                        fkCurso,
                        fkAluno,
                        LocalDate.now().minusYears(2),
                        aluno.getEvadiram() ? 1 : 0,
                        aluno.getMotivoEvasao(),
                        aluno.getEvadiram() ? LocalDate.now().minusMonths(3) : null
                );
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Historico (fkAluno, fkDisciplina, semestre, nota, frequencia) VALUES (?, ?, ?, ?, ?)",
                        fkAluno,
                        1,
                        aluno.getSemestre(),
                        aluno.getMediaGeral(),
                        aluno.getFrequencia()
                );
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Pagamento (mesReferencia, valor, statusPagamento, fkAluno) VALUES (?, ?, ?, ?)",
                        LocalDate.now(),
                        500.0,
                        aluno.getPago() ? "Pago" : "Atrasado",
                        fkAluno
                );
            } catch (Exception e) {
                e.printStackTrace();
            }

            double riscoNota;
            double nota = aluno.getMediaGeral();

            if (nota >= 7) riscoNota = 10;
            else if (nota >= 5) riscoNota = 40;
            else if (nota >= 3) riscoNota = 70;
            else riscoNota = 90;

            double freq = aluno.getFrequencia();
            double riscoFreq;

            if (freq >= 85) riscoFreq = 10;
            else if (freq >= 70) riscoFreq = 40;
            else if (freq >= 50) riscoFreq = 70;
            else riscoFreq = 90;

            double riscoFin = aluno.getPago() ? 10 : 70;

            double score =
                    (riscoNota * 0.40) +
                            (riscoFreq * 0.35) +
                            (riscoFin * 0.25);

            String nivel;

            if (score < 40) nivel = "Baixo";
            else if (score < 70) nivel = "Medio";
            else nivel = "Alto";

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO IndicadorRisco (score, nivel, dataCalculo, fkAluno) VALUES (?, ?, ?, ?)",
                        score,
                        nivel,
                        LocalDate.now(),
                        fkAluno
                );
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Logs (mensagem, dataHora) VALUES (?, NOW())",
                        "Aluno " + fkAluno + " processado com score " + score
                );
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        carregando = false;

        try {
            loadingThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("PROCESSO FINALIZADO!");
    }
}