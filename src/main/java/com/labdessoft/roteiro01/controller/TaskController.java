package com.labdessoft.roteiro01.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.service.TaskService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/task/{uuidStr}")
@AllArgsConstructor
public class TaskController {
    private TaskService taskService;
    private static final Pattern UUID_PATTERN =
            Pattern.compile("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9af]{4}-[0-9 a-f]{12}");

    public boolean isValidUuid(String uuidStr) {
        boolean is_valid_uuid = uuidStr != null && UUID_PATTERN.matcher(uuidStr).matches();
        if (is_valid_uuid) {
            return true;
        }
        return false;
    }

    @GetMapping("/")
    public ResponseEntity<List<Task>> listAll(@PathVariable String uuidStr) {
        if (isValidUuid(uuidStr)) {
            UUID dispositivoId = UUID.fromString(uuidStr);
            return ResponseEntity.ok(taskService.findAllByDispositivoId(dispositivoId));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable String uuidStr, @PathVariable Long id) {
        if (isValidUuid(uuidStr)) {
            UUID dispositivoId = UUID.fromString(uuidStr);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, id).orElse(null);
            if (existingTask != null) {
                return ResponseEntity.ok(existingTask);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/")
    public ResponseEntity<Task> createTask(@PathVariable String uuidStr, @RequestBody Task task) {
        if (this.isValidUuid(uuidStr)) {
            UUID dispositivoId = UUID.fromString(uuidStr);
            return ResponseEntity.ok(taskService.createTask(dispositivoId, task));
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/")
    public ResponseEntity<Task> updateTask(@PathVariable String uuidStr, @RequestBody Task task) {
        if (this.isValidUuid(uuidStr) && task.getId() != null && task.getId() != 0) {
            UUID dispositivoId = UUID.fromString(uuidStr);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, (Long) task.getId()).orElse(null);
            if (existingTask != null) {
                return ResponseEntity.ok(taskService.updateTask(existingTask, task.getDescricao()));
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/change-status")
    public ResponseEntity<Task> changeStatusTask(@PathVariable String uuidStr, @RequestBody Task task) {
        if (this.isValidUuid(uuidStr) && task.getId() != null && task.getId() != 0) {
            UUID dispositivoId = UUID.fromString(uuidStr);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, (Long) task.getId()).orElse(null);
            if (existingTask != null) {
                return ResponseEntity.ok(taskService.changeStatusTask(existingTask, task.getConcluida()));
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable String uuidStr, @PathVariable Long id) {
        if (this.isValidUuid(uuidStr)) {
            UUID dispositivoId = UUID.fromString(uuidStr);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, id).orElse(null);
            if (existingTask != null) {
                String response = taskService.deleteTask(existingTask);
                if (response.equals("Tarefa excluída com sucesso")) {
                    return ResponseEntity.ok(response);
                }
                return new ResponseEntity<>(response,
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
