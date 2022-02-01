const express = require("express")
//gera um id aleatório
const { randomUUID } = require("crypto")

const app = express()

app.use(express.json())//funciona como um middleware, funcionando no meio da aplicaçao

const products = []

// Body => Sempre que eu quiser enviar dados para minha aplicação
// Params => /products/215416453216451684
// Query => /products?id=215416453216451684&value=215416453216451684

app.post("/products", (request, response) => {
    const { name, price } = request.body

    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product)

    return response.json(product)
})
app.listen(4002, () => console.log("Servidor esta rodando na porta 4002"))