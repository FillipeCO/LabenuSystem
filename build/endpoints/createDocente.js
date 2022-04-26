"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocente = void 0;
const connection_1 = require("../data/connection");
const Docente_1 = require("../Classes/Docente");
function createDocente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const docenteId = new Date().getTime().toString();
        const docenteEspecialidadeTableId = new Date().getTime().toString();
        const { nome, email, data_nasc, turma_id, especialidade_id } = req.body;
        const docente = new Docente_1.Docente(docenteId, nome, email, data_nasc, turma_id);
        if (!nome || !email || !data_nasc || !especialidade_id) {
            res.status(400).send({ message: "Preencha todos os campos" });
            return;
        }
        try {
            yield connection_1.connection.raw(`
            INSERT INTO docente (id, nome, email, data_nasc, turma_id)
            VALUES (?, ?, ?, ?, ?)
        `, [docenteId, nome, email, data_nasc, turma_id]);
            if (especialidade_id.length > 1) {
                for (let i = 0; i < especialidade_id.length; i++) {
                    const newDocenteEspecialidadeTableId = new Date().getTime().toString();
                    yield connection_1.connection.raw(`
                    INSERT INTO docente_especialidade (id, docente_id, especialidade_id)
                    VALUES (?, ?, ?)
                `, [newDocenteEspecialidadeTableId, docenteId, especialidade_id[i]]);
                }
            }
            else {
                yield connection_1.connection.raw(`
            INSERT INTO docente_especialidade (id, docente_id, especialidade_id)
            VALUES (?, ?, ?)
        `, [docenteEspecialidadeTableId, docenteId, especialidade_id]);
            }
            res.status(200).send({
                message: "Docente criado com sucesso",
                docente,
            });
        }
        catch (error) {
            res.status(400).send({
                message: "Erro ao criar docente",
                error: error.sqlMessage || error.message,
            });
        }
    });
}
exports.createDocente = createDocente;
