package sptech.school;

import java.util.ArrayList;
import java.util.List;

import sptech.school.config.ConexaoBD;
import sptech.school.dao.AlunoDAO;
import sptech.school.dao.CursoDAO;
import sptech.school.dao.HistoricoDAO;
import sptech.school.dao.LogDAO;
import sptech.school.service.LeituraExcel;
import sptech.school.slack.Notificacao;
import sptech.school.slack.NotificacaoLog;
import sptech.school.slack.NotificacaoSlack;
import sptech.school.slack.Notificador;

public class Main {

    private static volatile boolean carregando = true;

    public static void main(String[] args) {

        ConexaoBD conexaoBD = new ConexaoBD();

        Notificador notificador = new Notificador();

        LeituraExcel leituraExcel = new LeituraExcel();

        CursoDAO cursoDAO = new CursoDAO(conexaoBD);
        AlunoDAO alunoDAO = new AlunoDAO(conexaoBD);
        HistoricoDAO historicoDAO = new HistoricoDAO(conexaoBD);
        LogDAO logDAO = new LogDAO(conexaoBD.getJdbcTemplate());

        notificador.adicionar(new NotificacaoLog("Processo de carga iniciado", StatusLog.SUCCESS, logDAO));
        notificador.adicionar(new NotificacaoSlack("Processo iniciado"));

        List<Curso> cursos = leituraExcel.extrairCursos("BaseDeDados.xlsx");
        List<Aluno> alunos = leituraExcel.extrairAlunos("BaseDeDados.xlsx");

        Thread loadingThread = new Thread(() -> {
            while (carregando) {
                System.out.println("PROCESSANDO INFORMAÇÕES...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        loadingThread.start();

        System.out.println("\n===== INSERINDO CURSOS =====");
        List<Integer> idsCursos = cursoDAO.inserirCursos(cursos);
        notificador.adicionar(
                new NotificacaoLog("Cursos inseridos", StatusLog.SUCCESS, logDAO)
        );
        notificador.enviarNotificacao();

        System.out.println("\n===== INSERINDO ALUNOS =====");
        alunoDAO.inserirAlunos(alunos);

        List<Aluno> alunoRisco = new ArrayList<>();

        for (Aluno aluno : alunos) {
            double score = aluno.cacularScore();
            String nivel = aluno.getNivelRisco();

            if (nivel.equals("Alto")) {
                alunoRisco.add(aluno);
                String alerta = "Aluno %s com alto risco de evasão".formatted(aluno.getNome());

//                String alerta = """
//                        ALERTA DE EVASÃO
//
//                        Aluno: %s %s
//                        Score: %.2f
//                        Frequência: %.2f%%
//                        Média: %.2f
//                        """
//                        .formatted(
//                                aluno.getNome(), aluno.getSobrenome(),
//                                score,
//                                aluno.getFrequencia(),
//                                aluno.getMediaGeral()
//                        );
                notificador.adicionar(new NotificacaoLog(alerta, StatusLog.ALERT, logDAO));
//                notificador.adicionar(new NotificacaoSlack(alerta));
            }
        }
        notificador.enviarNotificacao();

        if (!alunoRisco.isEmpty()) {
            String resumo = "ALERTA DE EVASÃO\n\n Total alunos com alto risco: " + alunoRisco.size();

            notificador.adicionar(new NotificacaoSlack(resumo));
            notificador.enviarNotificacao();
        }


        notificador.adicionar(
                new NotificacaoLog("Alunos inseridos", StatusLog.SUCCESS, logDAO)
        );
        notificador.enviarNotificacao();

        System.out.println("\n===== PROCESSANDO HISTÓRICOS E INDICADORES =====");
        historicoDAO.processarHistorico(alunos, idsCursos);
        notificador.adicionar(
                new NotificacaoLog("Históricos processados", StatusLog.SUCCESS, logDAO)
        );
        notificador.enviarNotificacao();

        carregando = false;

        try {
            loadingThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            String erro = """
            ERRO NO PROCESSAMENTO
            
            %s
            """.formatted(e.getMessage());

            notificador.adicionar(new NotificacaoLog(erro, StatusLog.ERROR, logDAO));
            notificador.enviarNotificacao();

            e.printStackTrace();
        }

        System.out.println("\nPROCESSO FINALIZADO!");
    }
}