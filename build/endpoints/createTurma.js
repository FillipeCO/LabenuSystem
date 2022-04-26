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
exports.createTurma = void 0;
const connection_1 = require("../data/connection");
const Turma_1 = require("../Classes/Turma");
function createTurma(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const turmaId = new Date().getTime().toString();
        try {
            const { nome, modulo, docentes, estudantes } = req.body;
            const turma = new Turma_1.Turma(turmaId, nome, modulo, docentes, estudantes);
            if (!nome || !modulo) {
                res.status(400).send({ message: "Preencha todos os campos!" });
                return;
            }
            else {
                yield connection_1.connection.raw(`
        INSERT INTO turma (id, nome, modulo, docentes, estudantes)
        VALUES ('${turmaId}', '${turma.nome}', '${turma.modulo}', '${turma.docentes}', '${turma.estudantes}')
    `);
                if (docentes.length > 1) {
                    for (let i = 0; i < docentes.length; i++) {
                        yield connection_1.connection.raw(`
                UPDATE docente
                SET turma_id = '${turmaId}'
                WHERE id = '${docentes[i]}'
            `);
                    }
                }
                else {
                    yield connection_1.connection.raw(`
            UPDATE docente
            SET turma_id = '${turmaId}'
            WHERE id = '${docentes}'
        `);
                }
                res.status(200).send({ message: "Turma criada com sucesso!", turma });
            }
            ;
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
    });
}
exports.createTurma = createTurma;
