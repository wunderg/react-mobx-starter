import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ActionClose from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import ActionMenu from 'material-ui/svg-icons/navigation/close';
import Paper from 'material-ui/Paper';

@inject(['todoState']) @observer
class Options extends Component {
  render() {
    const {showCompleted, showNotCompleted, showAll, itemsLeft, clearCompleted, getTodos} = this.props.todoState;
    return (
      <div className='optionsBar'>
        <Paper zDepth={2} style={{padding: 5, margin: 3, cursor: 'pointer'}}>
          {/* <ItemsLeft /> */}
          {/* <br /> */}
          {/* <Selectors /> */}
          <div>Items left - <b>{itemsLeft}</b></div>
          <br />
          <div>
            <span><strong>Select: </strong></span>
            <span style={{paddingLeft: 5}} onClick={showAll}><i>All</i></span>
            <span style={{paddingLeft: 5}} onClick={showCompleted}><i>Active</i></span>
            <span style={{paddingLeft: 5}} onClick={showNotCompleted}><i>Completed</i></span>
          </div>
          <br />
          <div onClick={clearCompleted}>Clear Completed</div>
        </Paper>
      </div>
    );
  }
};

@inject(['todoState']) @observer
class ItemsLeft extends Component {
  render() {
    const {itemsLeft} = this.props.todoState;
    return (
      <div>Items left - <b>{itemsLeft}</b></div>
    )
  }
};

@inject(['todoState']) @observer
class Selectors extends Component {
  render() {
    let styles={};
    const {showAll, showCompleted, showNotCompleted, selector} = this.props.todoState;
    if (selector) {
      styles.comp = {color: 'blue'};
    }
    else if(selector === false) {
      styles.uncomp = {color: 'blue'};
    } else {
      styles.all = {color: 'blue', paddingLeft: 5};
    }
    return (
      <div style={{width: 200}}>
        <span><strong>Select: </strong></span>
        <div style={styles.all} onClick={showAll}> All</div>
        <div style={styles.comp} onClick={showCompleted}>Active</div>
        <div style={styles.uncomp} onClick={showNotCompleted}>Complete</div>
      </div>
    )
  }
};

export default Options;
