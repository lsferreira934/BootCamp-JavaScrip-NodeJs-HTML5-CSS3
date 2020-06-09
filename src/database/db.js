//IMPORTAÇÃO DA DEPENDÊNCIA DO SQLITE3
const sqlite3 = require("sqlite3").verbose()//VERBOSE MOSTRAS AS MENSSAGENS NO TERMINAL

//CRIAR UM OBJETO QUE IRÁ FAZER OPERAÇÕES NO BANCO DE DADOS 
const db = new sqlite3.Database("./src/database/database.db") //NEW INICIA UM NOVO ONJETO - CONSTRUCTOR OU UMA CLASSE PARA INICIAR UM PROJETO, METÓDO DENTRO É PARA CRIAR O LOCAL DO ARQUIVO DO BANCO


module.exports = db



































//ULTILIZANDO O OBJETO PARA O BANCO DE DADOS
/*db.serialize(() => {
    //CRIANDO AS TABELAS
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT, 
            city TEXT,
            items TEXT
        ); 

    `)
    //INSIRIR DADOS NA TABELA
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) { //FUNÇÃO CRIADA PARA QUE SEJA FEITO UM TESTE DE ERRO CAINDO NO IF, CASO NÃO TENDO ELE RETORNA O CONSOLE.LOG
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    //db.run(query, values, afterInsertData) // ESTOU ATRIBUINDO AS CONSTANTES QUERY, VALUES E A FUNÇÃO AFTERINSERDATA

    //CONSULTAR OS DADOS DA TABELA
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)

    })

    //DELETAR UM DADO DA TABELA
    db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
        if (err) {
            return console.log(err)
        }

        console.log("Deletado com sucesso")
    })
})*/