package com.labdessoft.roteiro01.repository;

import com.labdessoft.roteiro01.entity.Task;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByDispositivoId(UUID dispositivoId);
    Optional<Task> findByDispositivoIdAndId(UUID dispositivoId, Long id);
}
