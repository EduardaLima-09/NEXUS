package sptech.school.slack;

public abstract class Notificacao {
    protected String mensagem;

    public Notificacao() {
    }

    public Notificacao(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public abstract void enviar();
}
