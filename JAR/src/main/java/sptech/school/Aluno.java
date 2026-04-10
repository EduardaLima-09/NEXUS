package sptech.school;

public class Aluno {
    private Integer id;
    private Boolean evadiram;
    private Double mediaGeral;
    private Double frequencia;
    private Boolean pago;
    private Integer semestre;
    private String motivoEvasao;
    private Curso curso;

    public Aluno(Integer id, Boolean evadiram, Double mediaGeral, Double frequencia, Boolean pago, Integer semestre, Curso curso, String motivoEvasao) {
        this.id = id;
        this.evadiram = evadiram;
        this.mediaGeral = mediaGeral;
        this.frequencia = frequencia;
        this.pago = pago;
        this.semestre = semestre;
        this.curso = curso;
        this.motivoEvasao = motivoEvasao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getEvadiram() {
        return evadiram;
    }

    public void setEvadiram(Boolean evadiram) {
        this.evadiram = evadiram;
    }

    public Double getMediaGeral() {
        return mediaGeral;
    }

    public void setMediaGeral(Double mediaGeral) {
        this.mediaGeral = mediaGeral;
    }

    public Double getFrequencia() {
        return frequencia;
    }

    public void setFrequencia(Double frequencia) {
        this.frequencia = frequencia;
    }

    public Boolean getPago() {
        return pago;
    }

    public void setPago(Boolean pago) {
        this.pago = pago;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public String getMotivoEvasao() {
        return motivoEvasao;
    }

    public void setMotivoEvasao(String motivoEvasao) {
        this.motivoEvasao = motivoEvasao;
    }

    @Override
    public String toString() {
        return "Aluno{" +
                "id=" + id +
                ", evadiram=" + evadiram +
                ", mediaGeral=" + mediaGeral +
                ", frequencia=" + frequencia +
                ", pago=" + pago +
                ", semestre=" + semestre +
                ", motivoEvasao='" + motivoEvasao + '\'' +
                ", curso=" + curso +
                '}';
    }
}
