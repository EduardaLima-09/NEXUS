package sptech.school.slack;

import org.springframework.jdbc.core.JdbcTemplate;
import sptech.school.Log;

public class NotificacaoLog extends Notificacao{

    public NotificacaoLog(String mensagem, JdbcTemplate jdbcTemplate) {
        super(mensagem);
    }

    @Override
    public void enviar() {
        Log log = new Log("ALERT", mensagem);
        System.out.println(log);
    }

}
