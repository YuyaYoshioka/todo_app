import React from 'react';

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

export default UpdateTodo;