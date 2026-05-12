package sptech.school.dto;

public class SlackDto {
    private String text;

    public SlackDto() {
    }

    public SlackDto(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
