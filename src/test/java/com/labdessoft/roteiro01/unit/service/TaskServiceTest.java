package com.labdessoft.roteiro01.unit.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.repository.TaskRepository;
import com.labdessoft.roteiro01.service.TaskService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllByDispositivoId() {
        when(taskRepository.findAllByDispositivoId("123"))
            .thenReturn(Collections.singletonList(new Task()));

        assertFalse(taskService.findAllByDispositivoId("123").isEmpty());
    }

    @Test
    public void testFindByDispositivoIdAndId() {
        when(taskRepository.findByDispositivoIdAndId("123", 1L))
            .thenReturn(Optional.of(new Task()));

        assertTrue(taskService.findByDispositivoIdAndId("123", 1L).isPresent());
    }

    @Test
    public void testCreateTask() {
        Task task = new Task();
        when(taskRepository.save(any(Task.class)))
            .thenReturn(task);

        Task createdTask = taskService.createTask(task);
        assertNotNull(createdTask);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testUpdateTask() {
        Task existingTask = new Task();
        existingTask.setId(1L);
        Task updatedTask = new Task();
        updatedTask.setDescricao("Updated Task");

        when(taskRepository.save(any(Task.class)))
            .thenReturn(updatedTask);

        Task result = taskService.updateTask(existingTask, updatedTask);
        assertEquals("Updated Task", result.getDescricao());
    }

    @Test
    public void testChangeStatusTask() {
        Task existingTask = new Task();
        existingTask.setId(1L);
        existingTask.setConcluida(false);

        when(taskRepository.save(any(Task.class)))
            .thenReturn(existingTask);

        Task result = taskService.changeStatusTask(existingTask, true);
        assertTrue(result.getConcluida());
    }

    @Test
    public void testDeleteTask() {
        Task task = new Task();
        task.setId(1L);

        doNothing().when(taskRepository).delete(any(Task.class));

        String result = taskService.deleteTask(task);
        assertEquals("Tarefa excluída com sucesso", result);
    }
}
