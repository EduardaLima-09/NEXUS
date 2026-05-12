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
        try {

            HttpClient client =
                    HttpClient.newHttpClient();

            ObjectMapper mapper =
                    new ObjectMapper();

            SlackDto dto =
                    new SlackDto(mensagem);

            // SERIALIZAÇÃO JSON
            String json =
                    mapper.writeValueAsString(dto);
            System.out.println(json);

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(WEBHOOK_URL))
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofString(json)
                            )
                            .build();

            HttpResponse<String> response =
                    client.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            System.out.println(
                    "Slack status: "
                            + response.statusCode()
            );

        } catch (
                IOException |
                InterruptedException e
        ) {

            System.out.println(
                    "Erro ao enviar notificação Slack"
            );

            e.printStackTrace();
        }


    }
}
