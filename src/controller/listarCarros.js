const { listarCarroDao, listarCarrosDisponiveisDao, listarCarrosAlugadosDao, listarCarroIdDao } = require("../dao/carroDao");

const listarCarros = async (req, res) => {
  try {
   const rows = await listarCarroDao();
   
   if (rows.length === 0) {
    res.status(404).json({ error: 'Não existem carros cadastrados' });
  } else {
    res.status(200).json({ carros: rows });        
  }
   
 } catch (error) {
   res.status(500).json({ error: 'Erro: Não foi possível listar os veículos' });
 }
};


const listarCarrosDisponiveis = async (req, res) => {
  try {

    const rows = await listarCarrosDisponiveisDao()

    if (rows.length === 0) {
      res.status(404).json({ error: 'No momento, todos os carros estão alugados' });
    } else {
      res.status(200).json({ carros: rows });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro: Não foi possível listar os carros disponíveis' });
  }
};

const listarCarrosAlugados = async (req, res) => {
   try {
    const rows = await listarCarrosAlugadosDao()

    if (rows.length === 0) {
      res.status(404).json({ error: 'No momento todos os carros estão disponíveis' });
    } else {
      res.status(200).json({ carros: rows });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro: Não foi possível listar os carros alugados' });
  }
};

const listarCarroId = async (req, res) => {
  try {
    const row = await listarCarroIdDao(req, res);

    if (!row) {
      res.status(404).json({ error: 'Veículo não encontrado' });
    } else {
      res.status(200).json({ carro: row });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};




module.exports = {
  listarCarros,
  listarCarrosDisponiveis,
  listarCarrosAlugados,
  listarCarroId
};