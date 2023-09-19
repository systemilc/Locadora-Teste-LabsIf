const express = require('express');
const router = express();
const { listarCarros, listarCarroId, listarCarrosDisponiveis, listarCarrosAlugados } = require('../listarCarros');
const { atualizarCarro } = require('../atualizaCarro');
const { deletarCarroId } = require('../deletarCarro');
const { NovoCarro } = require('../novoCarro');
const { alugarCarro } = require('../alugarCarro');
const { verificarIdCarro } = require('../../middleware/verificaIdParams');
const { verificarDisponibilidade } = require('../../middleware/verificaStatusVeiculo');


router.get('/carros', listarCarros);
router.get('/carros/disponiveis', listarCarrosDisponiveis);
router.get('/carros/alugados', listarCarrosAlugados);
router.get('/carros/:id', verificarIdCarro,listarCarroId);
router.put('/carros/:id', verificarIdCarro, atualizarCarro);
router.delete('/carros/:id',verificarDisponibilidade, deletarCarroId);
router.post('/carros', NovoCarro);
router.post('/carros/alugar', alugarCarro);

module.exports = {
    router
};

