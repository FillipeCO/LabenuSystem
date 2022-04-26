"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estudante = void 0;
const Usuario_1 = require("./Usuario");
class Estudante extends Usuario_1.Usuario {
    constructor(id, nome, email, data_nasc, turma_id, hobbies) {
        super(id, nome, email, data_nasc, turma_id);
        this.hobbies = hobbies;
    }
}
exports.Estudante = Estudante;
