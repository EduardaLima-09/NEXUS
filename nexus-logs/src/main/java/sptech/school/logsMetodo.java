package sptech.school;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class logsMetodo {

    String formatarData(LocalDateTime data) {
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern( "'['dd/MM/yyyy HH:mm:ss']'" );

        return data.format(formatar);
    }

    String cadastroUsuario(String nome, Integer id, LocalDateTime novaData) {
        String data = formatarData(novaData);
        String mensagem = "%s INFO: Usuário: %s | ID: %d se cadastrou no site.";

        return mensagem.formatted(data, nome, id);
    }

    String cadastroAluno(Integer id, String nomeAluno ,Integer idAluno, LocalDateTime novaData ) {
        String data = formatarData(novaData);
        String mensagem = "%s INFO: Usuário ID: %d | registrou Aluno: %s | ID: %d no site.";

        return mensagem.formatted(data, id, nomeAluno, idAluno);
    }

    String cadastroCurso(Integer id, String nomeCurso, Integer idCurso, LocalDateTime novaData) {
        String data = formatarData(novaData);
        String mensagem = "%s INFO: Usuário ID: %d | registrou Curso: %s | ID: %d no site.";

        return mensagem.formatted(data, id, nomeCurso, idCurso);
    }

    String erroCadastroAluno(Integer idAluno, LocalDateTime novaData) {
        String data = formatarData(novaData);
        String mensagem = "%s ERROR: Erro ao registrar Aluno ID: %d no banco de dados.";
        return mensagem.formatted(data, idAluno);
    }

    String erroUsuario(String nome, Integer id, LocalDateTime novaData) {
        String data = formatarData(novaData);
        String mensagem = "%s ERROR: Erro ao cadastrar Usuário: %s ID: %d.";
        return mensagem.formatted(data, nome, id);
    }
}
