package com.labdessoft.roteiro01.service;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.repository.TaskRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskService {
    private TaskRepository taskRepository;

    public List<Task> findAllByDispositivoId(UUID dispositivoId) {
        return taskRepository.findAllByDispositivoId(dispositivoId);
    }

    public Optional<Task> findByDispositivoIdAndId(UUID dispositivoId, Long id) {
        return taskRepository.findByDispositivoIdAndId(dispositivoId, id);
    }

    public Task createTask(UUID dispositivoId, Task task) {
        task.setDispositivoId(dispositivoId);
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public Task updateTask(Task existingTask, String descricao) {
        existingTask.setDescricao(descricao);
        existingTask.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(existingTask);
    }

    public Task changeStatusTask(Task existingTask, boolean isConcluida) {
        existingTask.setConcluida(isConcluida);
        existingTask.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(existingTask);
    }

    public String deleteTask(Task task) {
        try {
            taskRepository.delete(task);
            return "Tarefa excluída com sucesso";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
