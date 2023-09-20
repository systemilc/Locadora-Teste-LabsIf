const express = require('express');
const router = express();
const { listarCarros, listarCarrosDisponiveis, listarCarrosAlugados, listarCarroId } = require('../controller/listarCarros');
const { atualizarCarro } = require('../controller/atualizaCarro');
const { deletarCarroId } = require('../controller/deletarCarro');
const { novoCarro } = require('../controller/novoCarro');
const { alugarCarro } = require('../controller/alugarCarro');
const { verificarDisponibilidade } = require('../middleware/verificaStatusVeiculo');

router.get('/carros', listarCarros);
router.get('/carros/disponiveis', listarCarrosDisponiveis);
router.get('/carros/alugados', listarCarrosAlugados);
router.get('/carros/:id', listarCarroId);
router.put('/carros/:id', atualizarCarro);
router.delete('/carros/:id',verificarDisponibilidade, deletarCarroId);
router.post('/carros', novoCarro);
router.post('/carros/alugar', alugarCarro);

module.exports = {
    router
};

