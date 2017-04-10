import { observable, action, computed, when, useStrict, runInAction, autorun } from 'mobx';

useStrict(true);

class TodosState {
  @observable fetching = false;
  @observable todosList = [];
  @observable searchText = '';
  @observable selector = null;
  @observable nextId = 343;
  constructor(){
    autorun(() => this.getTodos());
  }

  @computed
  get isFetching() {
    return this.fetching;
  }

  @computed
  get shownTodos() {
    return this.todosList.filter(item => item.show && item.done != this.selector);
  }

  @computed
  get itemsLeft() {
    return this.todosList.filter(item => !item.done).length;
  }

  @action
  showAll = () => {
   this.selector = null;
  }

  @action
  showCompleted = () => {
   this.selector = true;
  }

  @action
  showNotCompleted = () => {
   this.selector = false;
  }

  @action
  handleChange = (event) => {
    this.searchText = event.target.value;
  }

  @action
  addTodo = (event) => {
    if(event.keyCode === 13 && this.searchText.length > 0) {
      const newTodo = {text: this.searchText, id: this.nextId++, done: false, show: true};
      this.todosList.push(newTodo);
      this.searchText = '';
      autorun(() => this.postTodos(newTodo));
    }
  }

  @action
  toggleTodo = (todo) => {
    todo.done = !todo.done;
  }

  @action
  clearCompleted = (todo) => {
    this.todosList.forEach(item => {
      item.done ? item.show = false : null;
    });
  }

  @action
  deleteTodo = (todo) => {
    todo.show = false;
    // this.todosList.forEach((item, index) => {
    //   if (item.id === todo.id) {
    //     this.todosList.splice(index, 1);
    //   }
    // });
  }

  @action
  getTodos = async () => {
    this.fetching = true;
    const todos = await fetch('./api/todos')
      .then(res => res.json())
      .then(res => runInAction(() => {
        this.todosList = res.todos;
        this.fetching = false;
      }))
      .catch(e => console.log(e))
  }

  @action
  postTodos = async function postTodos(todo) {
    await fetch('./api/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({todo})
    })
    .then(res => res.json())
    .catch(e => console.log(e))
  }
}

export default TodosState;
