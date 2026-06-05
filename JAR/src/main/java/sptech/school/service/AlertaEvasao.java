package sptech.school.service;

import sptech.school.Aluno;
import sptech.school.StatusLog;
import sptech.school.dao.LogDAO;
import sptech.school.slack.Notificador;

import java.util.ArrayList;
import java.util.List;

public class AlertaEvasao {
    private Notificador notificador;
    private LogDAO logDAO;

    public AlertaEvasao(Notificador notificador, LogDAO logDAO) {
        this.notificador = notificador;
        this.logDAO = logDAO;
    }

    public void verificar(List<Aluno> alunos) {
        List<Aluno> alunosRisco = new ArrayList<>();

        for (Aluno aluno : alunos) {
            Double score = aluno.cacularScore();

            if (score >= 70) {
                alunosRisco.add(aluno);

                String alerta = "Aluno %s com alto risco de evasão (%.2f)"
                        .formatted(aluno.getNome(), score);

                notificador.log(alerta, StatusLog.ALERT, logDAO);
            }
        }

            String relatorio = """
                    RELATÓRIO DA ANÁLISE:
                    
                    • Alunos analisados: %d
                    • Alunos em Alto Risco: %d
                    • Percentual de Risco: %.2f%%
                    
                    Consulte a Dashboard para acompanhar os indicadores.
                    """
                    .formatted(alunos.size(), alunosRisco.size(), (alunosRisco.size() * 100.0 / alunos.size()));

            notificador.slack(relatorio);

            System.out.println("Relatório enviado com sucesso!");
    }
}
