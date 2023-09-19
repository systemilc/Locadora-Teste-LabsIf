const todosOsCampos = (req, res, next)=> {
    const { modelo, marca, descricao, preco_aluguel, categoria, disponivel } = req.body
    console.log(modelo, marca, descricao, preco_aluguel, categoria, disponivel)
    if(!modelo || !marca || !descricao || !preco_aluguel || !categoria || !disponivel){
       return res.json({error: "É necessário informar todos os campos para criar ou atualiuzar um veículo."})
    }

    next()
}

module.exports = {
    todosOsCampos
}
