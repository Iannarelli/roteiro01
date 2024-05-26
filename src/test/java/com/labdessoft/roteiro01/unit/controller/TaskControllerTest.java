package com.labdessoft.roteiro01.unit.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.labdessoft.roteiro01.controller.TaskController;
import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.service.TaskService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    @Test
    public void testListAll() throws Exception {
        when(taskService.findAllByDispositivoId(any(String.class)))
            .thenReturn(Collections.singletonList(new Task()));

        mockMvc.perform(get("/task/")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetById() throws Exception {
        when(taskService.findByDispositivoIdAndId(any(String.class), eq(1L)))
            .thenReturn(Optional.of(new Task()));

        mockMvc.perform(get("/task/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testCreateTask() throws Exception {
        Task task = new Task();
        task.setDescricao("New Task");
        when(taskService.createTask(any(Task.class)))
            .thenReturn(task);

        mockMvc.perform(post("/task/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"descricao\":\"New Task\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdateTask() throws Exception {
        Task existingTask = new Task();
        existingTask.setId(1L);
        Task updatedTask = new Task();
        updatedTask.setDescricao("Updated Task");

        when(taskService.findByDispositivoIdAndId(any(String.class), eq(1L)))
            .thenReturn(Optional.of(existingTask));
        when(taskService.updateTask(any(Task.class), any(Task.class)))
            .thenReturn(updatedTask);

        mockMvc.perform(put("/task/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"descricao\":\"Updated Task\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testChangeStatusTask() throws Exception {
        Task existingTask = new Task();
        existingTask.setId(1L);
        Task updatedTask = new Task();
        updatedTask.setConcluida(true);

        when(taskService.findByDispositivoIdAndId(any(String.class), eq(1L)))
            .thenReturn(Optional.of(existingTask));
        when(taskService.changeStatusTask(any(Task.class), eq(true)))
            .thenReturn(updatedTask);

        mockMvc.perform(put("/task/1/change-status")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"concluida\":true}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteTask() throws Exception {
        Task existingTask = new Task();
        existingTask.setId(1L);

        when(taskService.findByDispositivoIdAndId(any(String.class), eq(1L)))
            .thenReturn(Optional.of(existingTask));
        when(taskService.deleteTask(any(Task.class)))
            .thenReturn("Tarefa excluída com sucesso");

        mockMvc.perform(delete("/task/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
