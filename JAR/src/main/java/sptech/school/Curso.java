package sptech.school;

public class Curso {
    private String nome;
    private String modalidade;
    private String periodo;
    private Double mensalidade;

    public Curso(String nome, String modalidade, String periodo, Double mensalidade) {
        this.nome = nome;
        this.modalidade = modalidade;
        this.periodo = periodo;
        this.mensalidade = mensalidade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public Double getMensalidade() {
        return mensalidade;
    }

    public void setMensalidade(Double mensalidade) {
        this.mensalidade = mensalidade;
    }

    @Override
    public String toString() {
        return "Curso{" +
                "nome='" + nome + '\'' +
                ", modalidade='" + modalidade + '\'' +
                ", periodo='" + periodo + '\'' +
                ", mensalidade=" + mensalidade +
                '}';
    }

}
