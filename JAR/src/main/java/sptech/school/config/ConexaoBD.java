package sptech.school.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoBD {

    private final JdbcTemplate jdbcTemplate;
    private final BasicDataSource conexao;

    public ConexaoBD() {
        BasicDataSource conexao = new BasicDataSource();

        conexao.setDriverClassName("com.mysql.cj.jdbc.Driver");
        conexao.setUrl(System.getenv("DB_URL"));
        conexao.setUsername(System.getenv("DB_USER"));
        conexao.setPassword(System.getenv("DB_PASSWORD"));

        this.conexao = conexao;
        this.jdbcTemplate = new JdbcTemplate(conexao);

        try {
            this.jdbcTemplate.queryForObject("SELECT 1", Integer.class);

            System.out.println("Conexão realizada com sucesso!");

        } catch (Exception e) {
            System.out.println("Erro ao conectar com o banco de dados: " + e.getMessage());
        }
    }

    public BasicDataSource getBasicDataSource() {
        return conexao;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
}

