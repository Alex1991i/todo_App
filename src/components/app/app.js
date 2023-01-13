import { Component } from 'react';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';
import './app.css';

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
    todoFilter: [
      { id: 1, button: 'All' },
      { id: 2, button: 'Active' },
      { id: 3, button: 'Completed' },
    ],
    filterId: 1,
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      };
    });
  };

  addTask = (meaning) => {
    const task = this.createTask(meaning);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, task],
    }));
  };

  onToggle = (id, name) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((todo) => (todo.id === id ? { ...todo, [name]: !todo[name] } : { ...todo }));
      return {
        todoData: newArr,
      };
    });
  };

  onToggleEdit = (id) => {
    this.onToggle(id, 'edit');
  };

  onToggleDone = (id) => {
    this.onToggle(id, 'done');
  };

  onClickFilter = (id) => {
    this.setState({
      filterId: id,
    });
  };

  clear = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((todo) => !todo.done);
      return {
        todoData: newArr,
      };
    });
  };

  onKeyDown = (id, e) => {
    if (e.keyCode === 13) {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((todo) =>
          todo.id === id ? { ...todo, edit: false, meaning: e.target.value } : { ...todo }
        );
        return {
          todoData: newArr,
        };
      });
    }
  };

  createTask(meaning) {
    return {
      id: this.maxId++,
      time: new Date(),
      meaning,
      done: false,
      edit: false,
    };
  }

  render() {
    const { todoData, todoFilter, filterId } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addTask} />
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEdit={this.onToggleEdit}
            filterId={filterId}
            onKeyDown={this.onKeyDown}
          />
          <Footer todof={todoFilter} todoCount={todoCount} onClickFilter={this.onClickFilter} clear={this.clear} />
        </section>
      </section>
    );
  }
}
