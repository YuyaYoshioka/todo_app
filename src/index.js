import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoApp extends Component {
  constructor() {
    super()
    this.state={
      value: '',
      todoList: [],
      count: 0
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
      console.log(i)
      console.log(todoList[i].id)
      console.log(id)
      if (todoList[i].id === id) {
        break
      }
      index++
    }
    console.log(index)
    todoList.splice(index, 1)
    this.setState({todoList: todoList})
  }

  render() {
    const todoListNode = this.state.todoList.map(element => {
      return (
        <TodoElement
          key={element.id}
          element={element}
          onDelete={id => this.handleDelete(id)}
        />
      )

    })
    
    return (
      <div>
        <h1>Todo App</h1>
        <AddTodo
          {...this.state}
          onChange={key_value => this.onChange(key_value)}
          add={todoElement => this.add(todoElement)}
        />
        <ul>
          {todoListNode}
        </ul>
      </div>
    );
  }
}

class TodoElement extends React.Component {
  onDelete() {
    this.props.onDelete(this.props.element.id)
  }

  render() {
    return(
      <li>
        <span>{this.props.element.content}</span>
        <button onClick={() => this.onDelete()}>削除</button>
      </li>
    )
  }
}

class AddTodo extends React.Component {
  onChange(e) {
    this.props.onChange({
      value: e.target.value,
    })
  }

  add() {
    if (!this.props.value) {
      alert('Todoリストの内容を入力してください')
      return
    }
    const todoElement = {
      content: this.props.value,
      id: this.props.count,
    }
    this.props.add(todoElement)
  }

  render() {
    return(
      <div>
          <input
            type="text"
            value={this.props.value}
            onChange={e => this.onChange(e)}
          />
        <button onClick={() => this.add()}>追加</button>
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp />,                    
  document.getElementById('root')       
);
