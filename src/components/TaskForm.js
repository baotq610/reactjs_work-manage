import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = ({
            id : '',
            name : '',
            status : false
        });
    }

    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.task) {
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status,
            });
        }else{
            this.setState({
                id : '',
                name : '',
                status : false
            })
        }
    }
    onCloseForm = () => {
        this.props.onCloseForm()
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status'){
             value = target.value === 'true' ? true : false;
        }
        this.setState ({
            [name] : value
        });
    }
    onSubmit = (event) =>{
        event.preventDefault(); 
        // this.props.onAddTask(this.state)
        this.onClear();
        this.onCloseForm();
    }
    onAddForm = () => {
        // this.props.onAddForm(this.state)
        this.props.onAddTask(this.state)
    }
    onClear = () => {
        this.setState({
            name : '',
            status : false
        })
    }
  render() {
    var {isDisplayForm} = this.props;
    var {id} = this.state;
    if (!this.props.isDisplayForm) return '';    
    return (        
      <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">{id ? "Cập nhật công việc" : "Thêm công việc"}</h3><button className="fas fa-window-close" onClick={this.onCloseForm}></button>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning" onClick={this.onAddForm}>Thêm</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    </div>    
    );
  }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask : (task) => {
            dispatch(actions.addTask(task))
        },
        onCloseForm : () => {
          dispatch(actions.closeForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
