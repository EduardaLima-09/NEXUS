package sptech.school;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class LeituraExcel {

    public List<Aluno> extrairAlunos(String nomeArquivo) {

        List<Aluno> alunos = new ArrayList<>();
        List<Curso> cursos = extrairCursos(nomeArquivo);
        List<Log> logs = new ArrayList<>();

        try (
                InputStream arquivo = new FileInputStream(nomeArquivo);
                Workbook workbook = new XSSFWorkbook(arquivo)
        ) {

            logs.add(new Log("INFO", "Iniciando leitura dos alunos do arquivo " + nomeArquivo));
            System.out.println("Lendo alunos do arquivo: " + nomeArquivo);

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {

                if (row.getRowNum() == 0) {
                    continue;
                }

                try {

                    System.out.println("Linha: " + row.getRowNum());

                    Integer id = (int) row.getCell(0).getNumericCellValue();

                    String evadiramTexto = row.getCell(1).getStringCellValue().trim().toLowerCase();
                    Boolean evadiram = evadiramTexto.equals("sim") || evadiramTexto.equals("true");

                    Double mediaGeral = row.getCell(2).getNumericCellValue();
                    Double frequencia = row.getCell(3).getNumericCellValue();

                    String pagoTexto = row.getCell(4).getStringCellValue().trim().toLowerCase();
                    Boolean pago = pagoTexto.equals("sim") || pagoTexto.equals("true");

                    Integer semestre = (int) row.getCell(5).getNumericCellValue();

                    String motivoEvasao = "";
                    Cell cellMotivo = row.getCell(6);

                    if (cellMotivo != null && cellMotivo.getCellType() == CellType.STRING) {
                        motivoEvasao = cellMotivo.getStringCellValue().trim();
                    }

                    String nomeCurso = row.getCell(7).getStringCellValue().trim();
                    String modalidade = row.getCell(8).getStringCellValue().trim();
                    String periodo = row.getCell(9).getStringCellValue().trim();
                    Double mensalidade = row.getCell(10).getNumericCellValue();

                    Curso cursoAluno = null;

                    for (Curso curso : cursos) {
                        if (curso.getNome().equalsIgnoreCase(nomeCurso)) {
                            cursoAluno = curso;
                            break;
                        }
                    }

                    if (cursoAluno == null) {
                        cursoAluno = new Curso(nomeCurso, modalidade, periodo, mensalidade);
                    }

                    Aluno aluno = new Aluno(
                            id,
                            evadiram,
                            mediaGeral,
                            frequencia,
                            pago,
                            semestre,
                            cursoAluno,
                            motivoEvasao
                    );

                    alunos.add(aluno);

                    logs.add(new Log(
                            "SUCESSO",
                            "Aluno ID " + id + " carregado com sucesso"
                    ));

                } catch (Exception e) {
                    logs.add(new Log(
                            "ERRO",
                            "Erro na linha " + row.getRowNum() + ": " + e.getMessage()
                    ));
                }
            }

            logs.add(new Log("INFO", "Leitura dos alunos finalizada com sucesso"));

            System.out.println("\n===== LOGS DE ALUNOS =====");
            for (Log log : logs) {
                System.out.println(log);
            }

        } catch (Exception e) {
            logs.add(new Log("ERRO CRÍTICO", "Falha ao abrir arquivo: " + e.getMessage()));
            e.printStackTrace();
        }

        return alunos;
    }

    public List<Curso> extrairCursos(String nomeArquivo) {

        List<Curso> cursos = new ArrayList<>();
        List<Log> logs = new ArrayList<>();

        try (
                InputStream arquivo = new FileInputStream(nomeArquivo);
                Workbook workbook = new XSSFWorkbook(arquivo)
        ) {

            logs.add(new Log("INFO", "Iniciando leitura dos cursos do arquivo " + nomeArquivo));
            System.out.println("Lendo cursos do arquivo: " + nomeArquivo);

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {

                if (row.getRowNum() == 0) {
                    continue;
                }

                try {

                    String nomeCurso = row.getCell(7).getStringCellValue().trim();
                    String modalidade = row.getCell(8).getStringCellValue().trim();
                    String periodo = row.getCell(9).getStringCellValue().trim();
                    Double mensalidade = row.getCell(10).getNumericCellValue();

                    boolean cursoExiste = false;

                    for (Curso curso : cursos) {
                        if (curso.getNome().equalsIgnoreCase(nomeCurso)) {
                            cursoExiste = true;
                            break;
                        }
                    }

                    if (!cursoExiste) {
                        Curso curso = new Curso(
                                nomeCurso,
                                modalidade,
                                periodo,
                                mensalidade
                        );

                        cursos.add(curso);

                        logs.add(new Log(
                                "SUCESSO",
                                "Curso " + nomeCurso + " carregado com sucesso"
                        ));
                    }

                } catch (Exception e) {
                    logs.add(new Log(
                            "ERRO",
                            "Erro ao ler curso na linha " + row.getRowNum() + ": " + e.getMessage()
                    ));
                }
            }

            logs.add(new Log("INFO", "Leitura dos cursos finalizada com sucesso"));

            System.out.println("\n===== LOGS DE CURSOS =====");
            for (Log log : logs) {
                System.out.println(log);
            }

        } catch (Exception e) {
            logs.add(new Log("ERRO CRÍTICO", "Falha ao abrir arquivo: " + e.getMessage()));
            e.printStackTrace();
        }

        return cursos;
    }
}