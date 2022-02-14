'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
    
}

    const pegaLocalStorage = () => JSON.parse(localStorage.getItem('db_clientes')) ?? [] // ?? [] - se o banco estiver vazio retorna uma string vazia
    const insereNoLocalStorage = (dbCliente) => localStorage.setItem('db_clientes', JSON.stringify(dbCliente))//JSON.stringify converte o objeto para string


//================ METODOS CRUD ================

    // DELETE
    const deletarCliente = (index) => {
        const dbCliente = lerClientes()
        dbCliente.splice(index, 1)
        insereNoLocalStorage(dbCliente)
    }
    
    // UPDATE
    const atualizandoClientes = (index, c) => {
        const dbCliente = lerClientes()
        dbCliente[index] = c
        insereNoLocalStorage(dbCliente)
    }

    // READ
    const lerClientes = () => pegaLocalStorage()

    // CREATE
    const criarCliente = (c) => {
        // Fazendo parse do que esta no banco para formato Json com JSON.parse
        // E inserindo numa lista db_clientes[]
        const dbCliente = pegaLocalStorage()
        dbCliente.push(c)
        insereNoLocalStorage(dbCliente)
        
    }

    
    // ============= VALIDADOR DE CAMPOS ====================
    
    const campoOk = () => {
        return document.getElementById('formulario').reportValidity()
    }

    // ============== AÇÕES DO MODAL
    
    const salvarCliente = () => {
        if (campoOk()) {
              const cliente = {
                  nome: document.getElementById('nome').value,
                  email: document.getElementById('email').value,
                  celular: document.getElementById('celular').value,
                  cidade: document.getElementById('cidade').value
              }

              criarCliente(cliente)
              atualizaTabela()
              closeModal()


            console.log('cadastrado');
        }
    }

    const criaLinha = (cliente) => {
        const novaLinha = document.createElement('tr')
        novaLinha.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.cidade}</td>
            <td>
                <button type="button" class="button green">editar</button>
                <button type="button" class="button red">excluir</button>
            </td>
        `
        document.querySelector('#tabelaCliente>tbody').appendChild(novaLinha)
    }

    const limpaTabela = () => {
        const linhas = document.querySelectorAll('#tabelaCliente>tbody tr')
        linhas.forEach(linhas => linhas.parentNode.removeChild(linhas))
    }

const atualizaTabela = () => {
    const dbCliente = lerClientes()
    limpaTabela()
    dbCliente.forEach(criaLinha)
}


    const clearFields = () => {
        const campos = document.querySelectorAll('.modal-field')
        campos.forEach(campos => campos.value = "")
    }




    // Inicia dos eventos

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('fechaModal')
    .addEventListener('click', closeModal)

    document.getElementById('salvar')
    .addEventListener('click', salvarCliente)



    // const db_clientes = JSON.parse(localStorage.getItem('db_cliente')) // Cria uma array que aramazena os dados existentes no banco  convertidos para formato JSON
    // db_clientes.push(cliente)
    // // JSON.stringify converte o objeto para o formato String
    // localStorage.setItem("db.cliente", "TesteDeInserção");
    // // localStorage.setItem("db.cliente", JSON.stringify(db_clientes))

// criarCliente(tempCliente)

// nome: "Godzila",
// email: "zila@teste.com",
// celular: "11993331111",
// cidade: "Osaka"

// nome: "Bart",
// email: "bart@teste.com",
// celular: "11443331111",
// cidade: "Sprinfield"

// nome: "E.T",
// email: "et@teste.com",
// celular: "119773331111",
// cidade: "Lua"

// nome: "Sofia",
// email: "sofi@teste.com",
// celular: "116773331111",
// cidade: "Ivaiporã"

// nome: "Lemmy Kilmister",
// email: "naldo@teste.com",
// celular: "55632323233",
// cidade: "Los Angeles"