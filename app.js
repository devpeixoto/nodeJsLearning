const express = require("express")
//gera um id aleatório
const { randomUUID } = require("crypto")
const fs = require("fs")

const app = express()

app.use(express.json())//funciona como um middleware, funcionando no meio da aplicaçao

let products = []

productFile()

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
    //cria um arquivo para mandar pro banco de dados 
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if(err) {
            console.log(err)
        }else {
            console.log("Produto inserido")
        }
    })

    return response.json(product)
})

app.get("/products", (request, response) => {
    return response.json(products)
})
//retorna um objeto completo
app.get("/products/:id", (request, response) => {
    const { id } = request.params
    const product = products.find(product => product.id === id)
    return response.json(product)
})
//retorna apenas o index do objeto
//Altera pegando no request o id do produto que voce quer e puxa também os parametros para alteração
app.put("/product/:id", (request, response) => {
    const { id } = request.params
    const { name, price } = request.body

    const productIndex = products.findIndex(product => product.id === id)
    //vai pegar todos os atributos de produto só que vai sobrescrever name, price que vão continuar com o mesmo valor
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    productFile()

    return response.json({message: "Produto alterado com sucesso"})
})

app.delete("/products?:id", (request, response) => {
    const { id } = request.params

    const productIndex = products.findIndex((product) => product.id === id)
    // vai remover o indice que foi passado como parametro
    products.splice(productIndex, 1)

    productFile()

    return response.json({message: "Produto removido com sucesso"})
})

function productFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if(err) {
            console.log(err)
        }else {
            console.log("Produto inserido")
        }
    })
}

app.listen(4002, () => console.log("Servidor esta rodando na porta 4002"))