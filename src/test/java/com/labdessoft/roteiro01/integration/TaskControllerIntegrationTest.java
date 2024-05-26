package com.labdessoft.roteiro01.integration;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;

import com.labdessoft.roteiro01.Roteiro01Application;
import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.entity.enums.PrioridadeTask;
import com.labdessoft.roteiro01.service.TaskService;

@SpringBootTest(classes = Roteiro01Application.class, webEnvironment = WebEnvironment.RANDOM_PORT)
public class TaskControllerIntegrationTest {
    // @Before
    // public void setup() {
    //     RestAssured.baseURI = "http://localhost:8080";
    //     RestAssured.port = 8080;
    // }

    @LocalServerPort
    private int port;

    private TestRestTemplate restTemplate;

    @Sql({ "schema.sql", "data.sql"})
    @Test
    public void testAllTasks() {
        assertTrue(
            this.restTemplate
                .getForObject("http://localhost:" + port + "/task", TaskService.class)
                .findAllByDispositivoId("4e9f4d4c-2d2f-4c4f-9e29-7c0940b7b7d7").size() == 0
        );
    }

    // @Test
    // public void testAddTask() {
    //     Task task = new Task(null, "4e9f4d4c-2d2f-4c4f-9e29-7c0940b7b7d7", "Nova task", false, 5, null, PrioridadeTask.BAIXA, LocalDateTime.now(), LocalDateTime.now(), null, null, false, null);
    //     ResponseEntity<String> responseEntity = this.restTemplate.postForEntity("http://localhost:" + port + "/task", task, String.class);
    //     assertEquals(201, responseEntity.getStatusCode().value());
    // }

    // @Test
    // public void givenUrl_whenSuccessOnGetsResponseAndJsonHasRequiredKV_thenCorrect() {
    //     get("/api/tasks").then().statusCode(200);
    // }

    // @Test
    // public void givenUrl_whenSuccessOnGetsResponseAndJsonHasOneTask_thenCorrect() {
    //     get("/api/tasks/1").then().statusCode(200).assertThat().body("description", equalTo("Primeira tarefa"));
    // }
}
