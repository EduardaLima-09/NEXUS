package sptech.school.dao;

import sptech.school.config.ConexaoBD;
import sptech.school.Curso;

import java.util.ArrayList;
import java.util.List;

public class CursoDAO {
    private final ConexaoBD conexaoBD;

    public CursoDAO(ConexaoBD conexaoBD) {
        this.conexaoBD = conexaoBD;
    }

    public List<Integer> inserirCursos(List<Curso> cursos) {
        List<Integer> idsCursos = new ArrayList<>();

        for (Curso curso : cursos) {
            try {
                conexaoBD.getJdbcTemplate().update(
                        "INSERT INTO Curso (nome, fkUniversidade) VALUES (?, 1)",
                        curso.getNome()
                );

                Integer idCurso = conexaoBD.getJdbcTemplate().queryForObject(
                        "SELECT id FROM Curso WHERE nome = ? ORDER BY id DESC LIMIT 1",
                        Integer.class,
                        curso.getNome()
                );

                idsCursos.add(idCurso);

                String msg = "Curso inserido: " + curso.getNome();
                System.out.println(msg);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return idsCursos;
    }
}
