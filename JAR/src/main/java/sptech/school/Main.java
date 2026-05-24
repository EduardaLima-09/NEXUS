package sptech.school;

import java.util.List;

import sptech.school.config.ConexaoBD;
import sptech.school.dao.AlunoDAO;
import sptech.school.dao.CursoDAO;
import sptech.school.dao.HistoricoDAO;
import sptech.school.service.LeituraExcel;
import sptech.school.slack.Notificacao;
import sptech.school.slack.NotificacaoLog;
import sptech.school.slack.NotificacaoSlack;

public class Main {

    private static volatile boolean carregando = true;

    public static void main(String[] args) {

        ConexaoBD conexaoBD = new ConexaoBD();

        Notificacao inicioLog = new NotificacaoLog("Processo de carga iniciado", conexaoBD.getJdbcTemplate());
        inicioLog.enviar();

        //Notificacao inicioSlack = new NotificacaoSlack("Processo de importação iniciado");
        //inicioSlack.enviar();

        LeituraExcel leituraExcel = new LeituraExcel();
        CursoDAO cursoDAO = new CursoDAO(conexaoBD);
        AlunoDAO alunoDAO = new AlunoDAO(conexaoBD);
        HistoricoDAO historicoDAO = new HistoricoDAO(conexaoBD);

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

        System.out.println("\n===== INSERINDO ALUNOS =====");
        alunoDAO.inserirAlunos(alunos);

        System.out.println("\n===== PROCESSANDO HISTÓRICOS E INDICADORES =====");
        historicoDAO.processarHistorico(alunos, idsCursos);

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

            Notificacao erroSlack = new NotificacaoSlack(erro);
            //erroSlack.enviar();

            e.printStackTrace();
        }

        System.out.println("\nPROCESSO FINALIZADO!");

        Notificacao fimSlack = new NotificacaoSlack("Processo finalizado com sucesso");
        //fimSlack.enviar();

        Notificacao fimLog = new NotificacaoLog("Processo finalizado",
                        conexaoBD.getJdbcTemplate());
        fimLog.enviar();
    }
}