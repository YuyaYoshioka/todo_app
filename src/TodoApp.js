import React, { Component } from "react";
import TodoElement from "./TodoElement";
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';

class TodoApp extends Component {
  constructor() {
    super()
    this.state={
      value: '',
      todoList: [],
      count: 0,
      flag: 0,
      editCount: -1,
    }
  }

  onChange(key_value) {
    this.setState(key_value)
  }

  add(todoElement) {
    this.setState({
      todoList: this.state.todoList.concat(todoElement),
      value: '',
      count: this.state.count + 1,
    })
  }

  handleDelete(id) {
    let todoList = this.state.todoList.concat()
    let index = 0
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        break
      }
      index++
    }
    console.log(index)
    todoList.splice(index, 1)
    this.setState({todoList: todoList})
  }

  handleEdit(id) {
    let todoList = this.state.todoList.concat()
    let index = 0
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        break
      }
      index++
    }
    this.setState({
      value: todoList[index].content,
      flag: 1,
      editCount: id,
    })
  }

  handleUpdate(newTodoList) {
    this.setState({
      value: '',
      todoList: newTodoList,
      flag: 0,
      editCount: -1,
    })
  }

  handleCancel() {
    this.setState({
      value: '',
      flag: 0,
    })
  }

  render() {
    const todoListNode = this.state.todoList.map(element => {
      return (
        <TodoElement
          key={element.id}
          element={element}
          onDelete={id => this.handleDelete(id)}
          onEdit={id => this.handleEdit(id)}
        />
      )
    })

    let changeTodo
    if (this.state.flag===0) {
      changeTodo = <AddTodo
        {...this.state}
        onChange={key_value => this.onChange(key_value)}
        add={todoElement => this.add(todoElement)}
      />
    } else {
      changeTodo = <UpdateTodo
        {...this.state}
        onChange={key_value => this.onChange(key_value)}
        onUpdate={newTodoList => this.handleUpdate(newTodoList)}
        onCancel={() => this.handleCancel()}
      />
    }
    
    return (
      <div>
        <h1>Todo App</h1>
        {changeTodo}
        <ul>
          {todoListNode}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
