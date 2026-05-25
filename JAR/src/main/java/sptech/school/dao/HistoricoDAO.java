package sptech.school.dao;

import sptech.school.Aluno;
import sptech.school.config.ConexaoBD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

public class HistoricoDAO {
    private final ConexaoBD conexaoBD;

    public HistoricoDAO(ConexaoBD conexaoBD) {
        this.conexaoBD = conexaoBD;
    }

    public void processarHistorico(List<Aluno> alunos, List<Integer> idsCursos) {
        try {
            Connection conexao = conexaoBD.getBasicDataSource().getConnection();
            conexao.setAutoCommit(false);

            PreparedStatement stmtHistorico =
                    conexao.prepareStatement(
                            """
                            INSERT INTO Historico
                            (fkAluno, semestre, nota, frequencia,fkCurso)
                            VALUES (?, ?, ?, ?, ?)
                            """
                    );

            PreparedStatement stmtIndicador =
                    conexao.prepareStatement(
                            """
                            INSERT INTO IndicadorRisco
                            (score, nivel, dataCalculo, fkAluno)
                            VALUES (?, ?, ?, ?)
                            """
                    );

            Random random = new Random();

            int contador = 0;

            for (int i = 0; i < alunos.size(); i++) {
                Aluno aluno = alunos.get(i);

                int fkAluno = i + 1;
                int fkCurso = idsCursos.get(i % idsCursos.size());
                int semestre = random.nextInt(8) + 1;

                stmtHistorico.setInt(1, fkAluno);
                stmtHistorico.setInt(2, semestre);
                stmtHistorico.setDouble(3, aluno.getMediaGeral());
                stmtHistorico.setDouble(4, aluno.getFrequencia());
                stmtHistorico.setInt(5, fkCurso);

                stmtHistorico.addBatch();

                stmtIndicador.setDouble(1, aluno.cacularScore());
                stmtIndicador.setString(2, aluno.getNivelRisco());
                stmtIndicador.setObject(3, LocalDate.now());
                stmtIndicador.setInt(4, fkAluno);

                stmtIndicador.addBatch();
                contador++;

                if (contador % 500 == 0) {
                    stmtHistorico.executeBatch();
                    stmtIndicador.executeBatch();

                    conexao.commit();

                    System.out.println(contador + " registros processados...");
                }
            }

            stmtHistorico.executeBatch();
            stmtIndicador.executeBatch();

            conexao.commit();

            stmtHistorico.close();
            stmtIndicador.close();

            conexao.close();
            System.out.println("Registros processados com sucesso!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
