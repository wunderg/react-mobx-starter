import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

@inject(['todoState']) @observer
class Todos extends Component {

  render() {
    const {handleChange, searchValue, addTodo} = this.props.todoState;
    debugger;
    return (
      <div className='todoInput'>
        <div>
          <Paper zDepth={1}>
            <TextField
              autoFocus={true}
              hintText=""
              floatingLabelText="What's needed to be done?"
              onKeyDown={addTodo}
              onChange={handleChange}
              value={searchValue}
              style={{width: 530, padding: 10}}
              underlineStyle={{display: 'none'}}
            />
          </Paper>
        </div>
      </div>
    );
  }
};

export default Todos;
