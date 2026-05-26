package sptech.school.service;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.io.FileInputStream;
import java.io.InputStream;

public class S3Service {

    private static final S3Client s3 = S3Client.create();

    public static InputStream getArquivo(String nomeArquivo){

            System.out.println("\nLeitura sendo feita em S3: " + nomeArquivo);

            GetObjectRequest request = GetObjectRequest.builder()
                    .bucket("nexus-projeto")
                    .key(nomeArquivo)
                    .build();

            return s3.getObject(request);

    }
}
