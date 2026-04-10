package sptech.school;

import java.util.List;

public class Main {

    public static void main(String[] args) {
        ConexaoBD conexaoBD = new ConexaoBD();
        LeituraExcel leituraExcel = new LeituraExcel();

        List<Curso> cursos = leituraExcel.extrairCursos("arquivo.xlsx");
        List<Aluno> alunos = leituraExcel.extrairAlunos("arquivo.xlsx");

        try {
            Integer resultado = conexaoBD.getJdbcTemplate().queryForObject(
                    "SELECT 1",
                    Integer.class
            );

            if (resultado != null && resultado == 1) {
                System.out.println("Conexão com o banco realizada com sucesso!");
            }

        } catch (Exception e) {
            System.out.println("Erro ao conectar com o banco:");
            System.out.println(e.getMessage());
        }
    }
}
