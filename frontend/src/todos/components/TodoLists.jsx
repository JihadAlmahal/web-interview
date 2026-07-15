import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

// Simulate network
//const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const API_BASE_URL = 'http://localhost:3001'

const fetchTodoLists = async () => {
  const response = await fetch(`${API_BASE_URL}/todo-lists`)
  return response.json()
}



export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const saveTodoList = async (id, { todos }) => {
  const response = await fetch(`${API_BASE_URL}/todo-lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  })
  const updatedList = await response.json()
  setTodoLists((current) => ({
     ...current, [id]: updatedList }))
}

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => {
              const list = todoLists[key]

              const completed = list.todos.length > 0 && list.todos.every((todo) => todo.completed)

              return (
            (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={list.title}
                secondary= {completed ? `Completed` : `In Progress`} />
              </ListItemButton>
            ))})}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={saveTodoList}
        />
      )}
    </Fragment>
  )
}
