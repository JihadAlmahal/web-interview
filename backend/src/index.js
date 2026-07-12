import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001
const todoLists = {  '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: ['First todo of first list!'],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: ['First todo of second list!'],
      },}

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/todo-lists', (req, res) => {
  res.json(todoLists)
})

app.put('/todo-lists/:id', (req, res) => {
  const { id } = req.params
  const { todos } = req.body
  const listToUpdate = todoLists[id]
  todoLists[id] = { ...listToUpdate, todos }
  res.json(todoLists[id])
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))


