package sptech.school.slack;

import org.springframework.jdbc.core.JdbcTemplate;
import sptech.school.Log;
import sptech.school.StatusLog;
import sptech.school.dao.LogDAO;

public class NotificacaoLog extends Notificacao{
    private LogDAO logDAO;
    private StatusLog status;

    public NotificacaoLog(String mensagem, StatusLog status, LogDAO logDAO) {
        super(mensagem);
        this.status = status;
        this.logDAO = logDAO;
    }

    @Override
    public void enviar() {
        Log log = new Log(status, mensagem);

        logDAO.salvar(log);
        System.out.println("Log registrado: " + log);
    }

}
