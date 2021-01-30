import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class TodoElement extends React.Component {
  onDelete() {
    this.props.onDelete(this.props.element.id)
  }

  onEdit() {
    this.props.onEdit(this.props.element.id)
  }

  render() {
    return(
      <li>
        <span>{this.props.element.content}</span>
        <button onClick={() => this.onDelete()}>削除</button>
        <button onClick={() => this.onEdit()}>編集</button>
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
    let todoList = this.props.todoList.concat()
    let todo
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].content === this.props.value) {
        todo = this.props.value
      }
    }
    if (todo) {
      const errorMessage = todo + 'はすでにTodoリスト内に存在します'
      alert(errorMessage)
    } else {
      const todoElement = {
      content: this.props.value,
      id: this.props.count,
    }
    this.props.add(todoElement)
    }
  }

  render() {
    return(
      <div>
        <input
          type="text"
          value={this.props.value}
          onChange={e => this.onChange(e)}
        />
        <button id='add-btn' onClick={() => this.add()}>追加</button>
      </div>
    )
  }
}

class UpdateTodo extends React.Component {
  onChange(e) {
    this.props.onChange({
      value: e.target.value,
    })
  }

  onUpdate() {
    if (!this.props.value) {
      alert('Todoリストの内容を入力してください')
      return
    }
    let newTodoList = this.props.todoList.concat()
    let todo
    for (let i = 0; i < newTodoList.length; i++) {
      if (newTodoList[i].content === this.props.value && newTodoList[i].id !== this.props.editCount) {
        todo = this.props.value
      }
      if (newTodoList[i].id === this.props.editCount) {
        newTodoList[i].content = this.props.value
      }
    }
    if (todo) {
      const errorMessage = todo + 'はすでにTodoリストに存在しています'
      alert(errorMessage)
    } else {
      this.props.onUpdate(newTodoList)
    }
  }

  onCancel() {
    this.props.onCancel()
  }

  render() {
    return(
      <div>
        <input
          type="text"
          value={this.props.value}
          onChange={e => this.onChange(e)}
        />
        <button onClick={() => this.onUpdate()}>編集</button>
        <button onClick={() => this.onCancel()}>キャンセル</button>
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp />,                    
  document.getElementById('root')       
);
