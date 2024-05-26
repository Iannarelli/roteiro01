package com.labdessoft.roteiro01.unit.repository;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.repository.TaskRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    public void testFindAllByDispositivoId() {
        Task task = new Task();
        task.setDispositivoId("123");
        taskRepository.save(task);

        List<Task> tasks = taskRepository.findAllByDispositivoId("123");
        assertFalse(tasks.isEmpty());
    }

    @Test
    public void testFindByDispositivoIdAndId() {
        Task task = new Task();
        task.setDispositivoId("123");
        task.setId(1L);
        taskRepository.save(task);

        Optional<Task> foundTask = taskRepository.findByDispositivoIdAndId("123", 1L);
        assertTrue(foundTask.isPresent());
    }

    @Test
    public void testSaveTask() {
        Task task = new Task();
        task.setDescricao("Test Task");
        Task savedTask = taskRepository.save(task);

        assertNotNull(savedTask);
        assertEquals("Test Task", savedTask.getDescricao());
    }

    @Test
    public void testDeleteTask() {
        Task task = new Task();
        task.setDescricao("Test Task");
        taskRepository.save(task);

        taskRepository.delete(task);

        Optional<Task> deletedTask = taskRepository.findById(Long.valueOf(task.getId()).intValue());
        assertFalse(deletedTask.isPresent());
    }
}
