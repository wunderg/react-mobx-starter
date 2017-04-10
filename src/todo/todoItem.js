import React from 'react';
import { inject, observer } from 'mobx-react';
import ActionDone from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import ActionClose from 'material-ui/svg-icons/navigation/close';
import ActionRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const TodoItem = props => {
    const {deleteTodo, toggleTodo} = props.todoState;
    const {todo, index} = props;
    return (
      <div
        onClick={toggleTodo.bind(null, todo)}
        className='todosItem'>
        <div>
          <IconButton iconStyle={todo.done ? {color: 'green'} : {color: '00BCD4'}}>
            {todo.done ? <ActionDone /> : <ActionRight />}
          </IconButton>
        </div>
        <div>{todo.text}</div>
        <div>

          <IconButton onClick={deleteTodo.bind(null, todo)} iconStyle={{color: 'red'}}>
            <ActionClose />
          </IconButton>
        </div>
      </div>
    );
};

export default inject('todoState')(observer(TodoItem));
