package sptech.school.service;

import sptech.school.Aluno;
import sptech.school.StatusLog;
import sptech.school.dao.LogDAO;
import sptech.school.slack.Notificacao;
import sptech.school.slack.NotificacaoLog;
import sptech.school.slack.NotificacaoSlack;
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

            if (score >= 75) {
                alunosRisco.add(aluno);

                String alerta = "Aluno %s com alto risco de evasão (%.2f)"
                        .formatted(aluno.getNome(), score);

                notificador.log(alerta, StatusLog.ALERT, logDAO);
            }
        }

        if (!alunosRisco.isEmpty()) {
            String lista = "";

            for (Aluno aluno : alunosRisco) {
                lista += "- %s %s | Score: %.2f | Média: %.2f | Frequência: %.2f%%\n"
                        .formatted(
                                aluno.getNome(),
                                aluno.getSobrenome(),
                                aluno.cacularScore(),
                                aluno.getMediaGeral(),
                                aluno.getFrequencia()
                        );
            }

            String relatorio = """
                    ALERTA DE EVASÃO
                    
                    Total alunos em risco: %d
                    
                    LISTA:
                    %s
                    """
                    .formatted(alunosRisco.size(), lista);

            notificador.slack(relatorio);

            System.out.println("Relatório enviado com sucesso!");
        }
    }
}
