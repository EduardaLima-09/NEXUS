# ═════════════════════════════════════════════════════════════
# DOCKERFILE — APLICAÇÃO JAVA (ETL)
# Compila o código Java 21 com Maven e gera o JAR executável
# Build: docker build -t imagem-java:v1 ./NEXUS/JAR
# ═════════════════════════════════════════════════════════════

# ── Etapa 1: compila o Java com Maven ──
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# ── Etapa 2: imagem final só com o JAR compilado ──
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/JAR-1.0-SNAPSHOT.jar app.jar
CMD ["java", "-jar", "app.jar"]
