package sptech.school;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class LeituraExcel {

    private Double getNumeric(Cell cell) {
        if (cell == null) return 0.0;

        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        } else if (cell.getCellType() == CellType.STRING) {
            try {
                return Double.parseDouble(cell.getStringCellValue());
            } catch (Exception e) {
                return 0.0;
            }
        }
        return 0.0;
    }

    private String getString(Cell cell) {
        if (cell == null) return "";

        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue();
        } else {
            return String.valueOf(cell);
        }
    }

    public List<Aluno> extrairAlunos(String nomeArquivo) {

        List<Aluno> alunos = new ArrayList<>();

        try (
                InputStream arquivo = S3Service.getArquivo(nomeArquivo);
                Workbook workbook = new XSSFWorkbook(arquivo)
        ) {

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {

                if (row.getRowNum() == 0) continue;

                try {

                    Integer id = row.getRowNum();

                    Double media = getNumeric(row.getCell(9));
                    Double freq = getNumeric(row.getCell(10));

                    String nome = getString(row.getCell(1));
                    String sobrenome = getString(row.getCell(2));
                    String sexo = getString(row.getCell(4));

                    if (!sexo.equals("M") && !sexo.equals("F")) {
                        sexo = "O";
                    }

                    alunos.add(new Aluno(id, media, freq, nome, sobrenome, sexo));

                } catch (Exception ignored) {}
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return alunos;
    }

    public List<Curso> extrairCursos(String nomeArquivo) {

        List<Curso> cursos = new ArrayList<>();

        try (
                InputStream arquivo = S3Service.getArquivo(nomeArquivo);
                Workbook workbook = new XSSFWorkbook(arquivo);
        ) {

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {

                if (row.getRowNum() == 0) continue;

                try {

                    String nomeCurso = getString(row.getCell(6)).trim();

                    boolean existe = false;

                    for (Curso c : cursos) {
                        if (c.getNome().equalsIgnoreCase(nomeCurso)) {
                            existe = true;
                            break;
                        }
                    }

                    if (!existe && !nomeCurso.isEmpty()) {
                        cursos.add(new Curso(nomeCurso));
                    }

                } catch (Exception ignored) {}
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return cursos;
    }
}