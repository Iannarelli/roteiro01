package com.labdessoft.roteiro01.service;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.repository.TaskRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TaskService {
    private TaskRepository taskRepository;

    public List<Task> findAllByDispositivoId(String dispositivoId) {
        return taskRepository.findAllByDispositivoId(dispositivoId);
    }

    public Optional<Task> findById(int id) {
        return taskRepository.findById(id);
    }

    public Optional<Task> findByDispositivoIdAndId(String dispositivoId, Long id) {
        return taskRepository.findByDispositivoIdAndId(dispositivoId, id);
    }

    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public Task updateTask(Task existingTask, Task task) {
        existingTask.setDescricao(task.getDescricao());
        existingTask.setPrazoDias(task.getPrazoDias());
        existingTask.setDataLimite(task.getDataLimite());
        existingTask.setPrioridade(task.getPrioridade());
        existingTask.setConcluida(task.getConcluida());
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
