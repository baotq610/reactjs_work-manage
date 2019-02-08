import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'


class TaskItem extends Component {


  onUpdateStatusTask = () => {
     this.props.onUpdateStatusTask(this.props.task.id);
  }
  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm()
  }
  onEditTask = () => {    
    this.props.onOpenForm(); 
    this.props.onEditTask(this.props.task);
  }
  render() {
    var {task,index} = this.props;
    return (
      <tr>
          <td>{ index + 1 }</td>
          <td>{task.name}</td>
          <td className="text-center">
              <span className={task.status === true ? "label label-success": "label label-danger"} onClick={this.onUpdateStatusTask} >
                          { task.status === true ? "Active" : "DeAc" }
              </span>
          </td>
          <td className="text-center">
              <button type="button" className="btn btn-warning" onClick={this.onEditTask}>
                  <span className="fa fa-pencil mr-5"></span>Sửa
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onDeleteTask} >
                  <span className="fa fa-trash mr-5"></span>Xóa
              </button>
          </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatusTask : (id) => {
          dispatch(actions.updateStatusTask(id))
        },
        onDeleteTask : (id) => {
          dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
          dispatch(actions.closeForm())
        },
        onOpenForm : () => {
          dispatch(actions.openForm())
        },
        onEditTask : (task) => {
          dispatch(actions.editTask(task))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
