import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { inject, observer } from 'mobx-react';
import Paper from 'material-ui/Paper';
import ActionDone from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import ActionClose from 'material-ui/svg-icons/navigation/close';
import ActionRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import TodoItem from './todoItem.js';
import styles from './styles.scss';

@inject(['todoState']) @observer
class TodoList extends Component {
  render() {
    const {shownTodos} = this.props.todoState;
    return (
      <div className='todosContainer'>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {shownTodos.map((todo, index) =>
          <Paper
            key={index}
            zDepth={2}>
            <TodoItem
              todo={todo}
              index={index}
            />
          </Paper>
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

export default TodoList;
