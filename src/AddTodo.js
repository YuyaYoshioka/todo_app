import React from 'react';

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

export default AddTodo;