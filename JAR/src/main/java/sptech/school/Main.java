package sptech.school;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import sptech.school.slack.Notificacao;
import sptech.school.slack.NotificacaoLog;
import sptech.school.slack.NotificacaoSlack;
import java.sql.Connection;
import java.sql.PreparedStatement;

public class Main {

    private static volatile boolean carregando = true;

    public static void main(String[] args) {

        ConexaoBD conexaoBD = new ConexaoBD();

        Notificacao inicioLog = new NotificacaoLog(
                "Processo de carga iniciado", conexaoBD.getJdbcTemplate()
                );
        inicioLog.enviar();

        Notificacao inicioSlack = new NotificacaoSlack("🚀 Processo de importação iniciado");
        inicioSlack.enviar();

        LeituraExcel leituraExcel = new LeituraExcel();

        List<Curso> cursos = leituraExcel.extrairCursos("BaseDeDados.xlsx");
        List<Aluno> alunos = leituraExcel.extrairAlunos("BaseDeDados.xlsx");

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

        List<Integer> idsCursos = new ArrayList<>();

        System.out.println("\n===== INSERINDO CURSOS =====");

        for (Curso curso : cursos) {

            String modalidade = random.nextBoolean() ? "Presencial" : "EAD";

            String[] periodos = {"Manhã", "Tarde", "Noite"};
            String periodo = periodos[random.nextInt(periodos.length)];

            double mensalidade = 300 + (1500 * random.nextDouble());

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Curso (nome, modalidade, periodo, mensalidade, fkUniversidade) VALUES (?, ?, ?, ?, 1)",
                        curso.getNome(),
                        modalidade,
                        periodo,
                        mensalidade
                );

                Integer idCurso = conexaoBD.getJdbcTemplate().queryForObject(
                        "SELECT id FROM Curso WHERE nome = ? ORDER BY id DESC LIMIT 1",
                        Integer.class,
                        curso.getNome()
                );

                idsCursos.add(idCurso);

                String msg = "Curso inserido: " + curso.getNome();
                System.out.println(msg);

                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Logs (mensagem, dataHora) VALUES (?, NOW())",
                        msg
                );

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        System.out.println("\n===== INSERINDO ALUNOS =====");

        try {
            Connection conexao = conexaoBD.getBasicDataSource().getConnection();

            conexao.setAutoCommit(false);

            String sql = "INSERT INTO Aluno (nome, sobrenome, cpf, sexo, email) VALUES (?, ?, ?, ?, ?)";

            PreparedStatement stmt = conexao.prepareStatement(sql);

            int contador = 0;

            for (Aluno aluno : alunos) {
                String cpf = String.format("%011d", random.nextInt(999999999));
                String email = "aluno" + aluno.getId() + "@gmail.com";

                stmt.setString(1, aluno.getNome());
                stmt.setString(2, aluno.getSobrenome());
                stmt.setString(3, cpf);
                stmt.setString(4, aluno.getSexo());
                stmt.setString(5, email);

                stmt.addBatch();

                contador++;

                if (contador % 500 == 0){
                    stmt.executeBatch();
                    conexao.commit();
                }
            }

            stmt.executeBatch();
            conexao.commit();

            stmt.close();
            conexao.close();

        } catch (Exception e) {

            e.printStackTrace();
        }

        System.out.println("\n===== INSERINDO DISCIPLINAS =====");

        for (Integer idCurso : idsCursos) {

            for (int j = 1; j <= 10; j++) {

                try {
                    conexaoBD.getJdbcTemplate().update(
                            "INSERT INTO Disciplina (nome, cargaHoraria, fkCurso) VALUES (?, ?, ?)",
                            "Disciplina " + j,
                            "60h",
                            idCurso
                    );

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        System.out.println("\n===== PROCESSANDO MATRÍCULAS =====");

        String[] motivos = {"Financeiro", "Mudança", "Desempenho", "Pessoal", "Saúde", "Trabalho"};

        for (int i = 0; i < alunos.size(); i++) {

            Aluno aluno = alunos.get(i);

            int fkAluno = i + 1;
            int fkCurso = idsCursos.get(i % idsCursos.size());

            LocalDate dataIngresso = LocalDate.now().minusYears(random.nextInt(4) + 1);

            int[] evadiuLista = {0, 1};
            int evadiu = evadiuLista[random.nextInt(evadiuLista.length)];

            String motivoEvasao = null;
            LocalDate dataEvasao = null;

            if (evadiu == 1) {
                motivoEvasao = motivos[random.nextInt(motivos.length)];
                dataEvasao = dataIngresso.plusMonths(random.nextInt(24) + 1);
            }

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Matricula (fkCurso, fkAluno, data_ingresso, evadiu, motivoEvasao, dataEvasao) VALUES (?, ?, ?, ?, ?, ?)",
                        fkCurso,
                        fkAluno,
                        dataIngresso,
                        evadiu,
                        motivoEvasao,
                        dataEvasao
                );

                String msg = "Matricula criada para aluno " + fkAluno;
                System.out.println(msg);

                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Logs (mensagem, dataHora) VALUES (?, NOW())",
                        msg
                );

            } catch (Exception e) {
                e.printStackTrace();
            }

            int semestre = random.nextInt(8) + 1;

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Historico (fkAluno, fkDisciplina, semestre, nota, frequencia) VALUES (?, ?, ?, ?, ?)",
                        fkAluno,
                        1,
                        semestre,
                        aluno.getMediaGeral(),
                        aluno.getFrequencia()
                );
            } catch (Exception e) {
                e.printStackTrace();
            }

            String[] statusList = {"Pago", "Pendente", "Atrasado"};
            String statusPagamento = statusList[random.nextInt(statusList.length)];

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Pagamento (mesReferencia, valor, statusPagamento, fkAluno) VALUES (?, ?, ?, ?)",
                        LocalDate.now(),
                        500.0,
                        statusPagamento,
                        fkAluno
                );
            } catch (Exception e) {
                e.printStackTrace();
            }

            double nota = aluno.getMediaGeral();
            double freq = aluno.getFrequencia();

            double riscoNota = nota >= 7 ? 10 : nota >= 5 ? 40 : nota >= 3 ? 70 : 90;
            double riscoFreq = freq >= 85 ? 10 : freq >= 70 ? 40 : freq >= 50 ? 70 : 90;
            double riscoFin = statusPagamento.equals("Pago") ? 10 : 70;

            double score = (riscoNota * 0.40) + (riscoFreq * 0.35) + (riscoFin * 0.25);

            String nivel = score < 40 ? "Baixo" : score < 70 ? "Medio" : "Alto";

            if (nivel.equals("Alto")) {

                String alerta = """
            ALERTA DE EVASÃO
            
            Aluno: %s %s
            Média: %.2f
            Frequência: %.2f
            Score de risco: %.2f
            """
                        .formatted(
                                aluno.getNome(),
                                aluno.getSobrenome(),
                                aluno.getMediaGeral(),
                                aluno.getFrequencia(),
                                score
                        );

                // POLIMORFISMO
                List<Notificacao> notificacoes =
                        List.of(

                                new NotificacaoLog(
                                        alerta,
                                        conexaoBD.getJdbcTemplate()
                                ),

                                new NotificacaoSlack(alerta)
                        );

                for (Notificacao n : notificacoes) {
                    n.enviar();
                }
            }

            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO IndicadorRisco (score, nivel, dataCalculo, fkAluno) VALUES (?, ?, ?, ?)",
                        score,
                        nivel,
                        LocalDate.now(),
                        fkAluno
                );

                String msg = "Indicador gerado para aluno " + fkAluno + " | Score: " + score;
                System.out.println(msg);

                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Logs (mensagem, dataHora) VALUES (?, NOW())",
                        msg
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

        catch (Exception e) {
            String erro = """
            ERRO NO PROCESSAMENTO
            
            %s
            """.formatted(e.getMessage());

            Notificacao erroSlack = new NotificacaoSlack(erro);
            erroSlack.enviar();

            e.printStackTrace();
        }

        System.out.println("\nPROCESSO FINALIZADO!");

        Notificacao fimSlack = new NotificacaoSlack("Processo finalizado com sucesso");
        fimSlack.enviar();

        Notificacao fimLog = new NotificacaoLog("Processo finalizado",
                        conexaoBD.getJdbcTemplate());
        fimLog.enviar();
    }
}