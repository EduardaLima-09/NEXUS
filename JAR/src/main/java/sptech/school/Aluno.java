package sptech.school;

public class Aluno {
    private Integer id;
    private Boolean evadiram;
    private Double mediaGeral;
    private Double frequencia;
    private Boolean pago;
    private Integer semestre;
    private String motivoEvasao;
    private String nome;
    private String sobrenome;
    private String sexo;

    public Aluno(Integer id, Double mediaGeral, Double frequencia, String nome, String sobrenome, String sexo) {
        this.id = id;
        this.mediaGeral = mediaGeral;
        this.frequencia = frequencia;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.sexo = sexo;

        this.evadiram = false;
        this.pago = Math.random() > 0.3;
        this.semestre = (int) (Math.random() * 8) + 1;
        this.motivoEvasao = null;
    }

    public Integer getId() { return id; }
    public Boolean getEvadiram() { return evadiram; }
    public Double getMediaGeral() { return mediaGeral; }
    public Double getFrequencia() { return frequencia; }
    public Boolean getPago() { return pago; }
    public Integer getSemestre() { return semestre; }
    public String getMotivoEvasao() { return motivoEvasao; }
    public String getNome() { return nome; }
    public String getSobrenome() { return sobrenome; }
    public String getSexo() { return sexo; }

    @Override
    public String toString() {
        return "Aluno{" +
                "id=" + id +
                ", media=" + mediaGeral +
                ", freq=" + frequencia +
                '}';
    }
}