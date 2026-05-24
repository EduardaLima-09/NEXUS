package sptech.school;

public class Aluno {
    private Integer id;
    private String nome;
    private String sobrenome;
    private Double mediaGeral;
    private Double frequencia;
    private Integer semestre;


    private String sexo;

    public Aluno(Integer id, Double mediaGeral, Double frequencia, String nome, String sobrenome, String sexo) {
        this.id = id;
        this.mediaGeral = mediaGeral;
        this.frequencia = frequencia;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.sexo = sexo;
        this.semestre = (int) (Math.random() * 8) + 1;
    }

    public Double cacularScore() {
        double riscoNota =
                mediaGeral >= 80 ? 10 :
                mediaGeral >= 60 ? 40 :
                mediaGeral >= 40 ? 70 :
                90;

        double riscoFreq =
                frequencia >= 90 ? 10 :
                frequencia >= 75 ? 40 :
                frequencia >= 60 ? 70 :
                90;

        return (riscoNota * 0.40) + (riscoFreq * 0.60);
    }

    public String getNivelRisco() {
        Double score = cacularScore();

        return score < 40 ? "Baixo" :
               score < 70 ? "Medio" :
               "Alto";
    }

    public Integer getId() { return id; }
    public Double getMediaGeral() { return mediaGeral; }
    public Double getFrequencia() { return frequencia; }
    public Integer getSemestre() { return semestre; }
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