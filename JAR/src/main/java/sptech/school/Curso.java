package sptech.school;

import java.util.Random;

public class Curso {
    private String nome;
    private String modalidade;
    private String periodo;
    private Double mensalidade;

    public Curso(String nome) {
        this.nome = nome;

        Random r = new Random();

        this.modalidade = r.nextBoolean() ? "Presencial" : "EAD";

        String[] periodos = {"Manhã", "Tarde", "Noite"};
        this.periodo = periodos[r.nextInt(periodos.length)];

        this.mensalidade = 300 + (1500 * r.nextDouble());
    }

    public String getNome() { return nome; }
    public String getModalidade() { return modalidade; }
    public String getPeriodo() { return periodo; }
    public Double getMensalidade() { return mensalidade; }
}