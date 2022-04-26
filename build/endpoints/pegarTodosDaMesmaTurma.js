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
exports.pegarTodosDaMesmaTurma = void 0;
const connection_1 = require("../data/connection");
function pegarTodosDaMesmaTurma(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).send({ message: "Preencha todos os campos!" });
                return;
            }
            const result = yield connection_1.connection.raw(`
                SELECT nome, id FROM docente
                WHERE turma_id = '${id}'
            `);
            const result2 = yield connection_1.connection.raw(`
                SELECT nome, id FROM estudante
                WHERE turma_id = '${id}'
            `);
            res.status(200).send({
                docentes: result[0],
                estudantes: result2[0]
            });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
    });
}
exports.pegarTodosDaMesmaTurma = pegarTodosDaMesmaTurma;
