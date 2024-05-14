FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install

FROM openjdk:21-jdk-slim

EXPOSE 8080

COPY --from=build target/roteiro01-0.0.1-SNAPSHOT.jar app.jar

# Variáveis de ambiente para acesso ao banco de dados PostgreSQL
ENV DB_URL=jdbc:postgres://admin:tjBsnHsIkJghzWxyksEpEiSqrzHzhxw0@dpg-coomtvm3e1ms73b8vdeg-a/todolist_i0j7
ENV DB_USERNAME=admin
ENV DB_PASSWORD=tjBsnHsIkJghzWxyksEpEiSqrzHzhxw0

ENTRYPOINT [ "java", "-jar", "app.jar" ]
