package sptech.school;

import java.util.ArrayList;
import java.util.List;

import sptech.school.config.ConexaoBD;
import sptech.school.dao.AlunoDAO;
import sptech.school.dao.CursoDAO;
import sptech.school.dao.HistoricoDAO;
import sptech.school.dao.LogDAO;
import sptech.school.service.AlertaEvasao;
import sptech.school.service.LeituraExcel;
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

        notificador.log("Processo de carga iniciado", StatusLog.SUCCESS, logDAO);

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
        notificador.log("Cursos inseridos", StatusLog.SUCCESS, logDAO);

        System.out.println("\n===== INSERINDO ALUNOS =====");
        alunoDAO.inserirAlunos(alunos);
        notificador.log("Alunos inseridos", StatusLog.SUCCESS, logDAO);

        System.out.println("\n==== GERANDO RELATÓRIO =====");
        AlertaEvasao alertaEvasao = new AlertaEvasao(notificador, logDAO);
        alertaEvasao.verificar(alunos);

        System.out.println("\n===== PROCESSANDO HISTÓRICOS E INDICADORES =====");
        historicoDAO.processarHistorico(alunos, idsCursos);
        notificador.log("Históricos processados", StatusLog.SUCCESS, logDAO);

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

            notificador.log(erro, StatusLog.ERROR, logDAO);

            e.printStackTrace();
        }
        notificador.log("Processo finalizado", StatusLog.SUCCESS, logDAO);

        System.out.println("\nPROCESSO FINALIZADO!");
    }
}