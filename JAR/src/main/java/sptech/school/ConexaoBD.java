package sptech.school;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoBD {

    private final JdbcTemplate jdbcTemplate;
    private final BasicDataSource conexao;

    public ConexaoBD() {
        BasicDataSource conexao = new BasicDataSource();

        conexao.setDriverClassName("com.mysql.cj.jdbc.Driver");
        conexao.setUrl("jdbc:mysql://ContainerBD:3306/NEXUS");
        conexao.setUsername("nexus");
        conexao.setPassword("N&xus12345");

        this.conexao = conexao;
        this.jdbcTemplate = new JdbcTemplate(conexao);

        if (this.jdbcTemplate != null) {
            System.out.println("Conexão realizada com sucesso!");
        } else {
            System.out.println("Erro ao conectar com o banco de dados.");
        }
    }

    public BasicDataSource getBasicDataSource() {
        return conexao;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
}

