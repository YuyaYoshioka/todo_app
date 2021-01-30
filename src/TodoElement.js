import React from "react";

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

export default TodoElement;