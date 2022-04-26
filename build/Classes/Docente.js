"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docente = void 0;
const Usuario_1 = require("./Usuario");
class Docente extends Usuario_1.Usuario {
    constructor(id, nome, email, data_nasc, turma_id) {
        super(id, nome, email, data_nasc, turma_id);
    }
}
exports.Docente = Docente;
