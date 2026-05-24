package sptech.school.dao;

import sptech.school.Aluno;
import sptech.school.config.ConexaoBD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Random;

public class AlunoDAO {

    private final ConexaoBD conexaoBD;

    public AlunoDAO(ConexaoBD conexaoBD) {
        this.conexaoBD = conexaoBD;
    }

    public void inserirAlunos(List<Aluno> alunos) {
        try {
            Connection conexao = conexaoBD.getBasicDataSource().getConnection();
            conexao.setAutoCommit(false);

            Random random = new Random();

            String sql = "INSERT INTO Aluno (nome, sobrenome, cpf, sexo, email) VALUES (?, ?, ?, ?, ?)";

            PreparedStatement stmt = conexao.prepareStatement(sql);

            int contador = 0;

            for (Aluno aluno : alunos) {
                String cpf = String.format("%011d", random.nextInt(999999999));
                String email = "aluno" + aluno.getId() + "@gmail.com";

                stmt.setString(1, aluno.getNome());
                stmt.setString(2, aluno.getSobrenome());
                stmt.setString(3, cpf);
                stmt.setString(4, aluno.getSexo());
                stmt.setString(5, email);

                stmt.addBatch();
                contador++;

                if (contador % 500 == 0){
                    stmt.executeBatch();
                    conexao.commit();

                    System.out.println(contador + " alunos inseridos...");
                }
            }

            stmt.executeBatch();
            conexao.commit();

            stmt.close();
            conexao.close();

            System.out.println("Todos os alunos inseridos!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
