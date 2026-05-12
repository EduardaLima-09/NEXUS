package sptech.school.slack;

public class TesteSlack {
        public static void main(String[] args) {

            NotificacaoSlack slack =
                    new NotificacaoSlack(
                            "Teste Slack funcionando"
                    );

            slack.enviar();
        }
}
