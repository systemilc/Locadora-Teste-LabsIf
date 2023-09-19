const express = require('express');
const router = express();
const { listarCarros, listarCarrosDisponiveis, listarCarrosAlugados, listarCarroId } = require('../controller/listarCarros');
const { atualizarCarro } = require('../controller/atualizaCarro');
const { deletarCarroId } = require('../controller/deletarCarro');
const { NovoCarro } = require('../controller/novoCarro');
const { alugarCarro } = require('../controller/alugarCarro');
const { verificarIdCarro } = require('../middleware/verificaIdParams');
const { todosOsCampos } = require('../middleware/camposObrigatorios');
const { verificarDisponibilidade } = require('../middleware/verificaStatusVeiculo');

router.get('/carros', listarCarros);
router.get('/carros/disponiveis', listarCarrosDisponiveis);
router.get('/carros/alugados', listarCarrosAlugados);
router.get('/carros/:id', verificarIdCarro,listarCarroId);
router.put('/carros/:id',todosOsCampos, verificarIdCarro, atualizarCarro);
router.delete('/carros/:id',verificarDisponibilidade, deletarCarroId);
router.post('/carros', todosOsCampos, NovoCarro);
router.post('/carros/alugar', alugarCarro);

module.exports = {
    router
};

