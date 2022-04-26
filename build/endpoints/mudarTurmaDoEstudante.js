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
exports.EditarEstudante = void 0;
const connection_1 = require("../data/connection");
const updateEstudantes = (id, turma_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connection)("estudante")
        .update({
        turma_id: turma_id
    })
        .where("id", id);
});
const EditarEstudante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { turma_id } = req.body;
        const id = req.params.id;
        const editEstudante = yield updateEstudantes(req.params.id, req.body.turma_id);
        res.status(200).send({
            message: "Editado com sucesso!", editEstudante
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});
exports.EditarEstudante = EditarEstudante;
