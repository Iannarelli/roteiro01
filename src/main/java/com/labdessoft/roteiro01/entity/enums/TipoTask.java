package com.labdessoft.roteiro01.entity.enums;

import com.labdessoft.roteiro01.entity.Task;

public enum TipoTask {
    DATA {
        @Override
        public boolean determinarTipo(Task task) {
            return task.getDataLimite() != null;
        }
    },
    PRAZO {
        @Override
        public boolean determinarTipo(Task task) {
            return task.getPrazoDias() != null;
        }
    },
    LIVRE {
        public boolean determinarTipo(Task task) {
            return task.getDataLimite() == null && task.getPrazoDias() == null;
        }
    };

    public abstract boolean determinarTipo(Task task);
}
