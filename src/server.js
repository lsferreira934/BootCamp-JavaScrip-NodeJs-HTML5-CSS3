//CARREGANDO O EXPRESS EM UMA CONSTANTE
const express = require("express")
//CARREGANDO O SERVIDOR EM UMA CONSTANTE E INICIANDO UM OBJETO DO EXPRESSS
const server = express()
//CARREGANDO O MODULO DO BANCO DE DADOS
const db = require("./database/db.js")



//CONFIGURAR PASTA PUBLICA
server.use(express.static("public"))

//HABILITAR O USO DO REQ.BODY NA APLICAÇÃO  
server.use(express.urlencoded({ extended: true }))


//ULTILIZANDO TEMPLATE ENGINE
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//CONFIGURAR CAMINHOS DA APLICAÇÃO
//PÁGINA INICIAL
//req: REQUISIÇÃO
//res: RESPOSTAS
server.get("/", (req, res) => {
    return res.render("index.html")
})

//------------------------------------------------------------------REQUISIÇÃO DA PÁGINA------------------------------------------------------
//REQUISIÇÃO GET PARA PEGAR A PAGINA HTML
server.get("/create-point", (req, res) => {

    //REQ.QUERY: QUERY STRINGS DA NOSSA URL
    //console.log(req.query)
    return res.render("create-point.html")
})

//------------------------------------------------------------------BANCO DE DADOS------------------------------------------------------------
//USO DO METÓDO POST PARA PEGAR A INFORMAÇÕES DO FORMULÁRIO E ADICIONAR NO BANCO
server.post("/savepoint", (req, res) => {

    //REQ.BODY: O CORPO DO NOSSO FORMULÁRIO
    console.log(req.body)

    //INSERIR DADOS NO BANCO DE DADOS
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state, 
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    //FUNÇÃO CRIADA PARA QUE SEJA FEITO UM TESTE DE ERRO CAINDO NO IF, CASO NÃO TENDO ELE RETORNA O CONSOLE.LOG
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        //console.log("Cadastrado com sucesso")
        //console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    // ESTOU ATRIBUINDO AS CONSTANTES QUERY, VALUES E A FUNÇÃO AFTERINSERDATA
    db.run(query, values, afterInsertData)

})

//------------------------------------------------------------------REQUISIÇÃO------------------------------------------------------------
server.get("/search-results", (req, res) => {

    const search = req.query.search

    //VERIFICAÇÃO DO IF PARA SABER SE A PESQUISA SERÁ VAZIA
    if (search == "") {
        //PESQUISA VAZIA
        //MOSTRANDO A OS DADOS NA PAGINA HTML
        return res.render("search-results.html", { total: 0 })
    }


    //PEGAR OS DADOS DO BANCO DE DADOS
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        //console.log("Aqui estão seus registros: ")
        //console.log(rows)

        const total = rows.length
        //MOSTRANDO OS DADOS NA PAGINA HTML
        return res.render("search-results.html", { places: rows, total: total })
    })

})


//LIGAR O SERVIDOR
server.listen(3000)