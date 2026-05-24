package sptech.school;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Log {

    private String dataHora;
    private StatusLog status;
    private String especificacao;

    public Log(StatusLog status, String especificacao) {
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern( "'['dd/MM/yyyy HH:mm:ss']'" );
        this.dataHora = LocalDateTime.now().format(formatar);
        this.status = status;
        this.especificacao = especificacao;
    }

    public String getDataHora() {
        return dataHora;
    }

    public StatusLog getStatus() {
        return status;
    }

    public String getEspecificacao() {
        return especificacao;
    }

    @Override
    public String toString() {
        return dataHora + status +": " + especificacao + ".";
    }
}