import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddToDo from './components/AddToDo';
import About from './components/pages/About';
import uuid from 'uuid';
import Axios from 'axios';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }
  
  //mark todo complete by toggleling
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id)  {
        todo.completed = !todo.completed
      } 
      return todo;
    }) })
  };

  //Filters through todos and deletes 
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  };

  //add to do list
  AddToDo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
      .then((res) => {
        res.data.id = uuid.v4();
        this.setState({todos: [...this.state.todos, res.data]});
      });
  };

  render() {
    return (
      <Router> 
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddToDo AddToDo={this.AddToDo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/About" component={About} />
          </div>
        </div>
      </Router>
    );
  };
}

export default App;
