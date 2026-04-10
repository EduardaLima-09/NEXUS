package sptech.school;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Log {

    private String dataHora;
    private String status;
    private String especificacao;

    public Log(String status, String especificacao) {
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern( "'['dd/MM/yyyy HH:mm:ss']'" );
        this.dataHora = LocalDateTime.now().format(formatar);
        this.status = status;
        this.especificacao = especificacao;
    }

    public String getDataHora() {
        return dataHora;
    }

    public String getStatus() {
        return status;
    }

    public String getEspecificacao() {
        return especificacao;
    }

    @Override
    public String toString() {
        return "Log{" +
                "['" + dataHora + "]" + status +": " + especificacao + ".";
    }
}