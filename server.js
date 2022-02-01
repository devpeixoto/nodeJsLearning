// importando http
const http = require("http")

// Criando um server local para receber os dados from 
http.createServer((request, response) => {
    response.writeHead(200, {'content-Type' : 'application/json'}) //content retorna o tipo do de arquivo ele retorna
    // passa tipo de retorno passando status de  sucesso
    if(response.url === "/produto") {
        response.end(JSON.stringify({
            message: "Rota do produto",
        }))
    }
    
    if(response.url === "/usuario") {
        response.end(JSON.stringify({
            message: "Rota do usuario"
        }))
    }
    
    response.end(JSON.stringify({
        message: "qualquer outra rota"
    }))
    // response.end(JSON.stringify({message: "Aplicação com node"}))   //responde para quem requisitou com uma mensagem 
})
.listen(4001, () => console.log("Servidor está rodando na porta 4001")) //Vai redirecionar a porta 4001 rec e envia