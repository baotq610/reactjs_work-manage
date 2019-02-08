import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { findIndex, filter } from 'lodash';
import { connect } from 'react-redux';
import * as actions from './actions/index'

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {          
      filterName : '',
      filterStatus : '-1',
      keyword : '',
      sortBy : 'name',
      sortValue : 1,
    };
  }

  onToggleForm = () => {
      // if (this.state.isDisplayForm && this.state.taskEditing) {
      //     console.log("th 1")
      //     this.setState({
      //       isDisplayForm : true,            
      //       taskEditing : null
      //     });
      // } else {
      //   this.setState({
      //       isDisplayForm : !this.state.isDisplayForm,            
      //       taskEditing : null
      //   });
      // }
      this.props.onToggleForm();
  }
 
  onAddForm = (data) => {
    var {tasks} = this.state;  
    
    if (data.id === "") {
        data.id = this.generateID();
        tasks.push(data);      
    }else {
        var index = this.findIndex(data.id);
        tasks[index] = data;
    }
    
    this.setState({
        tasks : tasks,
        taskEditing : null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
 

  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
  }
  onShowForm = () => {
    this.setState({
          isDisplayForm : true
      })
  }
  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);                  
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    this.onShowForm();
    
  }

  onFilter = (filterName, filterStatus) => {      
      filterStatus = parseInt(filterStatus, 10) ;   
      this.setState({
        filterName : filterName.toLowerCase(),
        filterStatus : filterStatus
      });
  }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword.toLowerCase()
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState ({
            sortBy : sortBy,
            sortValue : sortValue

        })
    }

  render() {
    var { taskEditing, filterName, filterStatus, keyword, sortBy, sortValue } = this.state;  // var tasks = this.state.tasks        
    //     if(filterName){            
    //         tasks = tasks.filter((task)=>{
    //             return task.name.toLowerCase().indexOf(filterName) !== -1;
    //         })
        
    //         tasks = tasks.filter((task)=> {
    //             if (filterStatus === -1) {
    //                 return task;
    //             }else{
    //                 return task.status === (filterStatus === 1 ? true : false)
    //             }
    //         })
    // }

    // // if (keyword) {        
    // //     tasks = tasks.filter((task)=>{
    // //         return task.name.toLowerCase().indexOf(keyword) !== -1;
    // //     })        
    // // }

    
    // tasks = filter(tasks, (task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    // })
    

    // if (sortBy === 'name') {
    //     tasks.sort((a,b)=>{
    //         if(a.name > b.name) return sortValue;
    //         else if(a.name < b.name) return -sortValue;
    //         else return 0;
    //     })
    // } else {
    //     tasks.sort((a,b)=>{
    //         if(a.status > b.status) return -sortValue;
    //         else if(a.status < b.status) return sortValue;
    //         else return 0;
    //     })
    // }
    var { isDisplayForm } = this.props;
    
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <TaskForm isDisplayForm={isDisplayForm} onAddForm={this.onAddForm} />
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
              
                <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue} />
                <TaskList  onUpdate={this.onUpdate} onFilter={this.onFilter}/>
            </div>
        </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
          dispatch(actions.toggleForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
