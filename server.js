
const express = require('express')

const server = express()

server.use(express.json())

let table = [
    {
      "id": 0,
      "nome": "Jane Cooper",
      "idade": "22",
      "civil": "Solteira",
      "cpf": "999.999.999-99",
      "cidade": "Salvador",
      "estado": "Bahia"
    },
    {
      "id": 1,
      "nome": "Filipe Marron",
      "idade": "22",
      "civil": "Solteiro",
      "cpf": "999.999.999-99",
      "cidade": "Salvador",
      "estado": "Bahia"
    },
    {
      "id": 2,
      "nome": "Daniel Luis",
      "idade": "22",
      "civil": "Solteiro",
      "cpf": "999.999.999-99",
      "cidade": "Salvador",
      "estado": "Bahia"
    }
  ]
  

server.get('/table', (req, res)=>{
    return res.json(table)
})

server.post('/table', (req, res)=>{
    const { id, nome, idade, civil, cpf, cidade, estado } = req.body
    table.push(id, nome, idade, civil, cpf, cidade, estado)

    return res.json(table)
})

server.put('/table/update/:id', (req, res)=>{
    const { id } = req.params
    ({nome, idade, civil, cpf, cidade, estado }) = req.body

    table[id] = nome, idade, civil, cpf, cidade, estado

    return res.json(table)
})

server.delete('/table/delete/:id', (req, res)=>{
    const { id } = req.params

    table.splice(id,1)

    return res.json({message: 'excluiu'})
})

server.listen(3000)