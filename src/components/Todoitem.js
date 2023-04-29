import React, { Component } from 'react'

export default class Todoitem extends Component {
  render() {
    const {title,handleDelete,handleEdit} =this.props;
    return (
      <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
        <h6>{title}</h6>
        <div className="todo-icon">
          <span className="mx-2 text-success">
          <i className="fa-solid fa-pen" onClick={handleEdit}></i>
          </span>
          <span className="mx-2 text-danger">
          <i className="fa-solid fa-trash" onClick={handleDelete}></i>
          </span>
        </div>
      </li>
    )
  }
}
