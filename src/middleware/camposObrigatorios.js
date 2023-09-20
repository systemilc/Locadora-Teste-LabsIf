const todosOsCampos = (req, res, next) => {
    const { modelo, marca, descricao, preco_aluguel, categoria, disponivel } = req.body
    if (!modelo || !marca || !descricao || !preco_aluguel || !categoria || !disponivel) {
        return res.status(400).json({ error: "É necessário informar todos os campos para criar ou atualizar um veículo." })
    }

    next()
}

module.exports = {
    todosOsCampos
}
