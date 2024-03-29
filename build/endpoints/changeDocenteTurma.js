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
exports.changeDocenteTurma = void 0;
const connection_1 = require("../data/connection");
function changeDocenteTurma(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, turma_id } = req.body;
            if (!id || !turma_id) {
                res.status(400).send({ message: "Preencha todos os campos!" });
            }
            else {
                const result = yield connection_1.connection.raw(`
        UPDATE docente
        SET turma_id = '${turma_id}'
        WHERE id = '${id}'
    `);
                res.status(200).send({ message: "Docente alterado com sucesso!" });
            }
            ;
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
    });
}
exports.changeDocenteTurma = changeDocenteTurma;
