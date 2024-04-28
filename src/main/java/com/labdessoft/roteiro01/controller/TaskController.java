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

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/task")
@AllArgsConstructor
public class TaskController {
    private TaskService taskService;
    private static final Pattern UUID_PATTERN =
            Pattern.compile("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9 a-f]{12}");

    private String createUuid() {
        return UUID.randomUUID().toString();
    }

    private boolean isValidUuid(String uuidStr) {
        boolean is_valid_uuid = uuidStr != null && UUID_PATTERN.matcher(uuidStr).matches();
        if (is_valid_uuid) {
            return true;
        }
        return false;
    }

    private String getUuidFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("uuid")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private String getUUID(HttpServletRequest request, HttpServletResponse response) {
        String uuidStr = getUuidFromCookie(request);
        if (uuidStr == null || !isValidUuid(uuidStr)) {
            uuidStr = createUuid();
            Cookie uuidCookie = new Cookie("uuid", uuidStr);
            uuidCookie.setHttpOnly(true);
            uuidCookie.setPath("/");
            response.addCookie(uuidCookie);
        }
        return uuidStr;
    }

    @GetMapping("/")
    @Operation(summary = "Lista todas as tarefas")
    public ResponseEntity<List<Task>> listAll(HttpServletRequest request,
                                              HttpServletResponse response) {
        try {
            String dispositivoId = getUUID(request, response);
            return ResponseEntity.ok(taskService.findAllByDispositivoId(dispositivoId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalhes de uma tarefa")
    public ResponseEntity<Task> getById(@PathVariable Long id,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        try {
            String dispositivoId = getUUID(request, response);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, id).orElse(null);
            if (existingTask == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(existingTask);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/")
    @Operation(summary = "Cria uma nova tarefa")
    public ResponseEntity<Task> createTask(@RequestBody Task task,
                                           HttpServletRequest request,
                                           HttpServletResponse response) {
        try {
            String dispositivoId = getUUID(request, response);
            task.setDispositivoId(dispositivoId);
            return ResponseEntity.ok(taskService.createTask(task));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Altera uma tarefa")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,
                                           @RequestBody Task task,
                                           HttpServletRequest request,
                                           HttpServletResponse response) {
        try {
            String dispositivoId = getUUID(request, response);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, id).orElse(null);
            if (existingTask == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(taskService.updateTask(existingTask, task));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/change-status")
    @Operation(summary = "Altera o status de uma tarefa")
    public ResponseEntity<Task> changeStatusTask(@PathVariable Long id,
                                                 @RequestBody Task task,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) {
        try {
            String dispositivoId = getUUID(request, response);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, id).orElse(null);
            if (existingTask == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(taskService.changeStatusTask(existingTask, task.getConcluida()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma tarefa")
    public ResponseEntity<String> deleteTask(@PathVariable Long id,
                                             HttpServletRequest request,
                                             HttpServletResponse response) {
        try {
            String dispositivoId = getUUID(request, response);
            Task existingTask = taskService.findByDispositivoIdAndId(dispositivoId, id).orElse(null);
            if (existingTask == null) {
                return ResponseEntity.notFound().build();
            }
            String result = taskService.deleteTask(existingTask);
            if (result.equals("Tarefa excluída com sucesso")) {
                return ResponseEntity.ok(result);
            }
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
