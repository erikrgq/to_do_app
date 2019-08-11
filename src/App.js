import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddToDo from './components/AddToDo';
import uuid from 'uuid';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Go to the bank',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Dinner with Wife',
        completed: false
      },
      {
        id: uuid.v4(),
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

  //Filters through todos and deletes 
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  };

  //add to do list
  AddToDo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  render() {
    return (
    <div className="App">
      <div className="container">
        <Header />
        <AddToDo AddToDo={this.AddToDo} />
        <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
      </div>
    </div>
    );
  };
}

export default App;
