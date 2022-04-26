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
exports.BuscarEstudante = void 0;
const connection_1 = require("../data/connection");
const BuscarEstudante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome } = req.query;
        if (!nome) {
            throw new Error(`Não foi possivel achar o nome '${nome}'`);
        }
        const filtraNome = yield (0, connection_1.connection)("estudante")
            .select("*")
            .where("nome", "like", `%${nome}%`);
        res.status(200).send(filtraNome);
    }
    catch (error) {
        res.send(error.message || error.sqlMessage);
    }
});
exports.BuscarEstudante = BuscarEstudante;
