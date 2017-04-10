import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TodoList from './todoList.js';
import OptionsBar from './optionsBar.js';
import TodoInput from './todoInput.js';

@inject('appState', 'todoState') @observer
class App extends Component {
  constructor(props) {
  super(props);
  }

  render() {
    console.log(this.props.todoState, this.props.appState);
    if (this.props.todoState.fetching) {
      return <div>Loading</div>
    }
    return (
      <div>
        <OptionsBar />
        <TodoInput />
        <TodoList todoList={this.props.todoState.shownTodos} />
      </div>
    );
  }
};

export default App;
