package sptech.school.slack;

import sptech.school.StatusLog;
import sptech.school.dao.LogDAO;

import java.util.ArrayList;
import java.util.List;

public class Notificador {
    private List<Notificacao> notificacoes = new ArrayList<>();

    public void adicionar(Notificacao notificacao) {
        notificacoes.add(notificacao);
    }

    public void log(String mensagem, StatusLog status, LogDAO logDAO) {
        adicionar(new NotificacaoLog(mensagem, status, logDAO));
        enviarNotificacao();
    }

    public void slack(String mensagem) {
        adicionar(new NotificacaoSlack(mensagem));
        enviarNotificacao();
    }

    public void enviarNotificacao() {
        for (Notificacao notificacao : notificacoes) {
            notificacao.enviar();
        }
        notificacoes.clear();
    }
}
