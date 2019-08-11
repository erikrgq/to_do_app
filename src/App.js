import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Go to the bank',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with Wife',
        completed: false
      },
      {
        id: 3,
        title: 'Pay Bills',
        completed: false
      },
    ]
  };
  
  //mark todo complete by toggleling
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id)  {
        todo.completed = !todo.completed
      } 
      return todo;
    }) })
  };

  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  };

  render() {
    console.log(this.state.todos);
    return (
    <div className="App">
      <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
    </div>
    );
  };
}

export default App;
