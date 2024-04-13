package com.labdessoft.roteiro01.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID dispositivoId;
    private String descricao;

    @JsonProperty("isConcluida")
    private boolean isConcluida;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public boolean getConcluida() {
        return this.isConcluida;
    }
}
