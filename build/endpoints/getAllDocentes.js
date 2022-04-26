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
exports.getAllDocentes = void 0;
const connection_1 = require("../data/connection");
function getAllDocentes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docentes = yield connection_1.connection
                .select("id", "nome", "email", "data_nasc", "turma_id")
                .from("docente");
            const especialidade = yield connection_1.connection
                .select("id", "nome")
                .from("especialidade");
            const docentesEspecialidades = yield connection_1.connection
                .select("docente_id", "especialidade_id")
                .from("docente_especialidade");
            const docentesWithEspecialidades = docentes.map((docente) => {
                const dataDeNascimento = new Date(docente.data_nasc).toLocaleDateString();
                docente.data_nasc = dataDeNascimento;
                const docenteEspecialidades = docentesEspecialidades.filter((docenteEspecialidade) => docenteEspecialidade.docente_id === docente.id);
                const docenteEspecialidadesIds = docenteEspecialidades.map((docenteEspecialidade) => docenteEspecialidade.especialidade_id);
                const docenteEspecialidadesNames = especialidade.filter((especialidade) => docenteEspecialidadesIds.includes(especialidade.id));
                return Object.assign(Object.assign({}, docente), { especialidades: docenteEspecialidadesNames });
            });
            res.status(200).send(docentesWithEspecialidades);
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
    });
}
exports.getAllDocentes = getAllDocentes;
