package com.labdessoft.roteiro01.entity;

import com.labdessoft.roteiro01.entity.enums.TipoTask;
import com.labdessoft.roteiro01.entity.enums.PrioridadeTask;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PostLoad;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Todos os detalhes de uma tarefa")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(name = "O id do dispositivo deve ser uma string de um UUID válido")    
    private String dispositivoId;

    @Schema(name = "Descrição da tarefa deve possuir pelo menos 10 caracteres")
    @Size(min = 10, message = "Descrição da tarefa deve possuir pelo menos 10 caracteres")
    private String descricao;

    @JsonProperty("isConcluida")
    @Schema(name = "O status da tarefa deve ser booleano")
    private boolean isConcluida;

    @Schema(name = "O prazo para execução da tarefa deve ser um inteiro positivo")
    @Positive(message = "O prazo deve ser um número inteiro positivo")
    @Digits(integer = Integer.MAX_VALUE, fraction = 0, message = "O prazo deve ser um número inteiro")
    private Integer prazoDias;

    @Schema(name = "A data limite deve ser uma data estimada para conclusão da tarefa")
    private LocalDate dataLimite;

    @Enumerated(EnumType.STRING)
    private PrioridadeTask prioridade;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private TipoTask tipo;

    private LocalDate concluirAte = null;
    private boolean atrasada = false;
    private Long atraso = (long) 0;

    public boolean getConcluida() {
        return this.isConcluida;
    }

    @Override
    public String toString() {
        return "Task [id=" + id + ", descrição=" + descricao + ", concluída=" + isConcluida + "]";
    }

    public void setPrazos() {
        this.atrasada = LocalDate.now().compareTo(this.concluirAte) > 0;
        if (this.atrasada) {
            this.atraso = ChronoUnit.DAYS.between(this.concluirAte, LocalDate.now());
        }
    }

    @PostLoad
    private void init() {
        if (this.dataLimite != null) {
            this.tipo = TipoTask.DATA;
            this.concluirAte = this.dataLimite;
            if (!this.isConcluida) {
                this.setPrazos();
            }
        } else if (this.prazoDias != null) {
            this.tipo = TipoTask.PRAZO;
            this.concluirAte = this.createdAt.plusDays((long) this.prazoDias).toLocalDate();
            if (!this.isConcluida) {
                this.setPrazos();
            }
        } else {
            this.tipo = TipoTask.LIVRE;
        }
    }
}
