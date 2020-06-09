// SCRIPTS DE CONFIGURAÇÃO DA SELAÇÃO DE ESTADO E CIDADE  
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") // COLOCANDO EM UMA CONSTANTE  O SELETOR INDICANDO O INPUT UF DO HTML
    //O FETCH É UMA PROMESSA DE RESPOSTA DE REQUISIÇÃO
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        //TRANSFORMANDO A RESPOSTA EM JSON
        .then(res => res.json()) //.then( () => {return res.json() }) 
        //FUNÇÃO PARA JOGAR A LISTA DOS ESTADOS (ARRAY) DENTRO DO FOR (LOOP) PARA SER MOSTRADO
        .then(states => {

            for (const state of states) {
                //ULTILIZANDO A CONSTANTE.FUNÇÃO HTML CONCATENANDO SCRIPT E INTERPOLANDO ${} ELEMENTO DENTRO O ARRAY PARA SEREM MOSTRADOS
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })

}

populateUFs()


function getCities() {
    // COLOCANDO EM UMA CONSTANTE O SELETOR INDICANDO O INPUT CITY DO HTML
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    // COLOCANDO EM UMA CONSTANTE CARRENDO UM EVENTO DEFININDO O TARGET DO VALOR DO FOR DE UF 
    const ufValue = event.target.value
    // CONTANTE RESPONSAVEL POR PEGAR O ELEMENTO NO SELECTINDEX PARA SABER QUAL É O ESTADO 
    const indexOfSelectedState = event.target.selectedIndex
    //CONTANTE QUE SERÁ ALIMENTADA COM O VALOR DO ESTADO 
    stateInput.value = event.target.options[indexOfSelectedState].text
    // COLOCANDO EM UMA CONSTANTE URL O LINK DOS MUNICIPIOS E INTERPOLANDO /33/ PARA VARIAVEL UFVALUE
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //SERÁ POSTO A VARIAVEL EM VAZIO PARA NÃO REPLICARLA NO FOR
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    //É COLOCADO COM TRUE PARA QUE SEJA TRAVADO A FUNÇÃO DISABLE DO CAMPO CIDADE PARA NÃO REPLICAR
    citySelect.disabled = true

    //O FETCH É UMA PROMESSA DE RESPOSTA DE REQUISIÇÃO
    fetch(url)
        //TRANSFORMANDO A RESPOSTA EM JSON
        .then(res => res.json()) //.then( () => {return res.json() }) 
        //FUNÇÃO PARA JOGAR A LISTA DOS ESTADOS (ARRAY) DENTRO DO FOR (LOOP) PARA SER MOSTRADO
        .then(cities => {

            for (const city of cities) {
                //ULTILIZANDO A CONSTANTE.FUNÇÃO HTML CONCATENANDO SCRIPT E INTERPOLANDO ${} ELEMENTO DENTRO O ARRAY PARA SEREM MOSTRADOS
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

//MADAR PARA O CONSOLE DO NAVEGADOR O EVENTO
document
    .querySelector("select[name=uf]")
    //USANDO UMA FUNÇÃO DE ESCUTAR EVENTO PARA RECEBER UMA AÇÃO NA OPÇÃO ESTADO E RESPONDER NO CONSOLE DO BROWSER
    //É FEITO A INTRODUÇÃO DA FUNÇÃO getCities MAS NÃO É ABERTO OS PARENTENSES
    .addEventListener("change", getCities)

//--------------------------------------------------------------------------------------------------------------------


//ITENS DE COLETA
//PEGANDO TODOS OS LI'S
const itemsToCollect = document.querySelectorAll(".items-grid li")
//USANDO O FOR PARA COLETAR TODOS OS ITENS DO GRID
for (const item of itemsToCollect) {
    console.log(itemsToCollect)
    //ADCIONANDO O EVENTO CLIQUE PARA CADA ITEM PEGO PELO ITEMSTOCOLLECT
    item.addEventListener("click", handleSelectedItem)
}


//ATUALIZAR O CAMPO ESCONDIDO COM OS ITENS SELECIONADOS
const collectedItems = document.querySelector("input[name=items]")

//ARRAY QUE ARMAZENARÁ AS ENTRADAS DE SELEÇÃO DOS ITENS
let selectedItems = []


//FUNÇÃO DE EVENTO PARA PEGAR OS CLIQUES
function handleSelectedItem(event) {
    const itemLi = event.target
    // ADICIONAR O REMOVER UMA CLASSE COM JAVASCRIPT - O TOGGLE REMOVE OU ADICIONA
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //VERIFICAR SE A ITENS SELECIONADOS, SE SIM PEGAR OS TENS SELECIONADOS
    //PEGAR OS ITENS SELECIONADOS
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // ISSO SERÁ TRUE OU FLASE
        return itemFound
    })
    //SE JÁ ESTIVER SELECIONADO, TIRAR DA SELEÇÃO
    if (alreadySelected >= 0) {
        //REMOVER DA SELEÇÃO
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //FALSE
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //SE NÃO ESTIVER SELECIONADO , ADICIONAR À SELEÇÃO
        selectedItems.push(itemId)
    }



    //ATUALIZAR O CAMPO ESCONDIDO COM OS ITENS SELECIONADOS
    collectedItems.value = selectedItems
}