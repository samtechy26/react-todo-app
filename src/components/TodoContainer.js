import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, Switch } from "react-router-dom"
import TodosList from './TodosList'
import Header from "./Header"
import InputTodo from './InputTodo'
import About from "./pages/About"
import NoMatch from "./pages/NoMatch"
import Navbar from "./Navbar"


const TodoContainer =() =>{
    const [todos, setTodos] = useState((getInitialTodos))


    const handleChange = id => {
        setTodos(prevState => 
            prevState.map(todo => {
                if (todo.id === id){
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
             return todo
             })
        )
    }

    const delTodo = id => {
        setTodos([
            ...todos.filter(todo => {
                return todo.id !== id
            }),
        ])
    }
      
    const addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        }
        setTodos([...todos, newTodo])
    }

    const setUpdate = (updatedTitle, id) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle
                }
                return todo
            })
        )
    }

    function getInitialTodos() {
        //getting stored items

        const temp = localStorage.getItem("todos")
        const savedTodos = JSON.parse(temp)
        return savedTodos || []
    }

    useEffect(() => {
        // storing todo items

        const temp = JSON.stringify(todos)
        localStorage.setItem("todos", temp)
    }, [todos])
    
    return (
        
        <>
        <Navbar />
        <Routes>
            
            <Route exact path="/" element={
                <div className="container">
                <div className="inner">
                    <Header />
                    <InputTodo addTodoProps={addTodoItem} />
                    <TodosList
                    todos={todos}
                    handleChangeProps={handleChange}
                    deleteTodoProps={delTodo}
                    setUpdate={setUpdate}
                    />
                </div>
                </div>
            } />
                <Route  path="/about" element={<About />} />
                <Route path="/*" element={<NoMatch />} />
           
            
            
    </Routes>    

    </>
         
    )
    
}

export default TodoContainer