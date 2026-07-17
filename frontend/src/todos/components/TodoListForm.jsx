import React, { useState, useEffect, useRef } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
    saveTodoList(todoList.id, { todos })
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [todos, todoList.id, saveTodoList])


  const dueDateDifference = (todo) => {
    
    if (!todo.dueDate) {
      return ''
    }

    const today = new Date()
    const due = new Date(todo.dueDate)

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    
    const differenceInTime = due.getTime() - today.getTime()
    
    
    if (todo.completed) {
      return 'Completed'
    }

    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

   

    if (differenceInDays < 0) {
      return `Overdue by ${Math.abs(differenceInDays)} days`
    }
    if (differenceInDays === 0) {
      return 'Due today'
    }
    
    return `Due in ${differenceInDays} days`
  

  }


  const updateTodo = (index, update) => {
    setTodos([
      ...todos.slice(0, index),
      {
        ...todos[index],
        ...update,
      },
     
      ...todos.slice(index + 1),
    ])
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => {
                  updateTodo(index, { text: event.target.value })
                }}
              />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem', marginLeft: '8px' }}
                label='Due Date'
                InputLabelProps={{ shrink: true }}
                type='date'
                value={todo.dueDate}
                onChange={(event) => {
                  updateTodo(index, { dueDate: event.target.value })
                }}
              />
              <Typography sx={{ margin: '8px' }} variant='body1'>
                {dueDateDifference(todo)}
              </Typography>
              <input 
              type='checkbox'
              checked={todo.completed}
              onChange={(event) => {
                updateTodo(index, { completed: event.target.checked })
              }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { text: '', completed: false,  dueDate: '' }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
