package sptech.school.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import sptech.school.Log;
import sptech.school.StatusLog;

public class LogDAO {
    private JdbcTemplate jdbcTemplate;

    public LogDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void salvar(Log log) {
        jdbcTemplate.update(
                "INSERT INTO Logs(status, mensagem, dataHora) VALUES (?, ?, NOW())",
                log.getStatus().name(),
                log.getEspecificacao());
    }
}
