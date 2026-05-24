package sptech.school.service;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.io.FileInputStream;
import java.io.InputStream;

public class S3Service {

    private static final boolean usarS3 = false;

    public static InputStream getArquivo(String nomeArquivo){

        try {
            if(!usarS3) {
                System.out.println("Leitura de arquivo local:" + nomeArquivo);
                return new FileInputStream(nomeArquivo);
            }

            System.out.println("Leitura de arquivo em S3:" + nomeArquivo);

            S3Client s3 = S3Client.create();

            GetObjectRequest request = GetObjectRequest.builder()
                    .bucket("nexus-projeto")
                    .key(nomeArquivo)
                    .build();

            return s3.getObject(request);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao carregar arquivo", e);
        }
    }
}
