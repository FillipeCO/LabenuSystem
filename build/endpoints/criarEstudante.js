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
exports.getEstudantesHobby = exports.CriarEstudante = void 0;
const connection_1 = require("../data/connection");
const Estudante_1 = require("../Classes/Estudante");
const create = (estudante) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connection)("estudante")
        .insert({
        id: Date.now().toString(),
        nome: estudante.nome,
        email: estudante.email,
        data_nasc: estudante.data_nasc,
        turma_id: estudante.turma_id,
    });
});
const Hobby = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connection)("hobby")
        .select("id")
        .where("nome", nome);
});
const createHobby = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.connection)("hobby")
        .insert({
        id: Date.now().toString(),
        nome: nome
    });
});
const CriarEstudante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id, nome, email, data_nasc, turma_id, hobbies } = req.body;
        let data_formatada = data_nasc;
        let data = data_formatada.split('-').reverse().join('/');
        let novoEstudante = new Estudante_1.Estudante(id, nome, email, data, turma_id, hobbies);
        const createEstudante = yield create(novoEstudante);
        const mapHobbies = hobbies.map((hobby) => __awaiter(void 0, void 0, void 0, function* () {
            const condicao = yield Hobby(hobby);
            let result = yield (0, connection_1.connection)("hobby").select("id").where("nome", hobby);
            if (!result[0]) {
                const create = yield createHobby(hobby);
                result = yield (0, connection_1.connection)("hobby").select("id").where("nome", hobby);
            }
            const idnew = Date.now().toString();
            const idEstudante = yield (0, connection_1.connection)("estudante").select("id").where("nome", nome);
            const insert = yield connection_1.connection.raw(`
            INSERT INTO estudante_hobby (id, estudante_id, hobby_id)
            VALUES ('${idnew}', '${idEstudante[0].id}', '${result[0].id}')
        `);
        }));
        res.status(201).send("Aluno cadastrado com sucesso!");
    }
    catch (error) {
        res.send(error.message || error.sqlMessage);
    }
});
exports.CriarEstudante = CriarEstudante;
// Exibir estudantes que possuam o mesmo hobby;
function getEstudantesHobby(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { hobbyName } = req.params;
            const result = yield connection_1.connection.raw(`
            SELECT estudante.nome, estudante.email, estudante.data_nasc, estudante.turma_id
            FROM estudante
            INNER JOIN estudante_hobby ON estudante.id = estudante_hobby.estudante_id
            INNER JOIN hobby ON estudante_hobby.hobby_id = hobby.id
            WHERE hobby.nome = '${hobbyName}'
        `);
            res.status(200).send(result[0]);
        }
        catch (err) {
            res.status(400).send({
                message: err.message,
            });
        }
    });
}
exports.getEstudantesHobby = getEstudantesHobby;
