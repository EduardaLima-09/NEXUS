package sptech.school.slack;

import java.util.ArrayList;
import java.util.List;

public class Notificador {
    private List<Notificacao> notificacoes = new ArrayList<>();

    public void adicionar(Notificacao notificacao) {
        notificacoes.add(notificacao);
    }

    public void enviarNotificacao() {
        for (Notificacao notificacao : notificacoes) {
            notificacao.enviar();
        }
        notificacoes.clear();
    }
}
