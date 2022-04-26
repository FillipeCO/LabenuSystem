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
exports.mudarTurmaDeModulo = void 0;
const connection_1 = require("../data/connection");
function mudarTurmaDeModulo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, modulo } = req.body;
        if (!id || !modulo) {
            res.status(400).send({ message: "Preencha todos os campos!" });
            return;
        }
        else {
            try {
                yield connection_1.connection.raw(`
            UPDATE turma
            SET modulo = '${modulo}'
            WHERE id = '${id}'
        `);
                res.status(200).send({ message: "Turma alterada com sucesso!" });
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        }
    });
}
exports.mudarTurmaDeModulo = mudarTurmaDeModulo;
