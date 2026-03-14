package sptech.school;

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

        LocalDateTime novaData = LocalDateTime.of(2026, 3, 6, 10, 30, 4);
        System.out.println(log.cadastroUsuario(nome[0], id[0], novaData));

        novaData = LocalDateTime.of(2026,3, 6, 10, 32, 9);
        System.out.println(log.cadastroAluno(id[0], nomeAluno[0], idAluno[0], novaData));

        novaData = LocalDateTime.of(2026,3, 6, 10, 33, 27);
        System.out.println(log.cadastroCurso(id[0], nomeCurso[0], idCurso[0], novaData));

        novaData = LocalDateTime.of(2026,3, 6, 10, 34, 11);
        System.out.println(log.erroCadastroAluno(idAluno[1], novaData));

        novaData = LocalDateTime.of(2026,3, 6, 10, 34, 31);
        System.out.println(log.erroUsuario(nome[1], id[1], novaData));

        novaData = LocalDateTime.of(2026,3, 6, 10, 36, 3);
        System.out.println(log.cadastroUsuario(nome[1], id[1], novaData));
    }
}
