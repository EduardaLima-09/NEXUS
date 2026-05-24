package sptech.school.slack;

import com.fasterxml.jackson.databind.ObjectMapper;
import sptech.school.dto.SlackDto;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class NotificacaoSlack extends Notificacao{
    private static final String WEBHOOK_URL =
            System.getenv("SLACK_WEBHOOK");

    public NotificacaoSlack(String mensagem) {
        super(mensagem);
    }

    @Override
    public void enviar() {
        if (WEBHOOK_URL == null || WEBHOOK_URL.isBlank()) {
            System.out.println("Webhook não configurado");
            return;
        }

        try {
            HttpClient client = HttpClient.newHttpClient();

            ObjectMapper mapper = new ObjectMapper();

            SlackDto dto = new SlackDto(mensagem);

            String json = mapper.writeValueAsString(dto);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(
                         URI.create(WEBHOOK_URL)
                    )
                    .header(
                         "Content-Type",
                         "application/json"
                    )
                    .POST(
                         HttpRequest.BodyPublishers.ofString(json)
                    )
                    .build();

            client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

        } catch (IOException | InterruptedException e) {
            System.out.println("Erro ao enviar notificação Slack");
            e.printStackTrace();
        }
    }
}
