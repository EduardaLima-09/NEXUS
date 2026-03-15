package school.sptech;

import java.time.LocalDateTime;

public class logsMain {
    public static void main(String[] args) {
        Integer [] id = new Integer[] {1, 2};
        String [] nome = new String[] {"Cesar", "Maria"};

        Integer [] idAluno = new Integer[] {1, 2};
        String [] nomeAluno = new String[] {"Matheus", "Leonardo"};

        Integer [] idCurso = new Integer[] {1, 2};
        String [] nomeCurso = new String[] {"Análise e Desenvolvimento de Sistemas", "Ciências da Computação"};

        logsMetodo log = new logsMetodo();

        LocalDateTime novaData = LocalDateTime.of(2026, 3, 16, 16, 38, 13);
        System.out.println(log.cadastroUsuario(nome[0], id[0], novaData));

        novaData = LocalDateTime.of(2026,3, 16, 16, 40, 49);
        System.out.println(log.cadastroAluno(id[0], nomeAluno[0], idAluno[0], novaData));

        novaData = LocalDateTime.of(2026,3, 16, 16, 42, 23);
        System.out.println(log.cadastroCurso(id[0], nomeCurso[0], idCurso[0], novaData));

        novaData = LocalDateTime.of(2026,3, 16, 16, 44, 2);
        System.out.println(log.erroCadastroAluno(idAluno[1], novaData));

        novaData = LocalDateTime.of(2026,3, 16, 16, 45, 37);
        System.out.println(log.erroUsuario(nome[1], id[1], novaData));

        novaData = LocalDateTime.now();
        System.out.println(log.cadastroUsuario(nome[1], id[1], novaData));
    }
}
