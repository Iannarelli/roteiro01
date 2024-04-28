package com.labdessoft.roteiro01.repository;

import com.labdessoft.roteiro01.entity.Task;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findAllByDispositivoId(String dispositivoId);
    Optional<Task> findById(int id);
    Optional<Task> findByDispositivoIdAndId(String dispositivoId, Long id);
}
