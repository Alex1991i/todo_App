import { Component } from 'react';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';
import './app.css';

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [],
    todoFilter: [
      { id: 1, button: 'All', selected: true },
      { id: 2, button: 'Active', selected: false },
      { id: 3, button: 'Completed', selected: false },
    ],
    statusActive: 'All',
  };

  componentDidMount() {
    setInterval(() => {
      this.interval = this.setState(({ todoData }) => {
        const newArr = todoData.map((el) => {
          if (el.timer === 0) {
            return el;
          }
          if (!el.pause) {
            // eslint-disable-next-line no-param-reassign
            el.timer -= 1;
          }
          return el;
        });
        return {
          todoData: newArr,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlay = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => (el.id === id ? { ...el, pause: false } : { ...el }));
      return {
        todoData: newArr,
      };
    });
  };

  onPause = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => (el.id === id ? { ...el, pause: true } : { ...el }));
      return {
        todoData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      };
    });
  };

  addTask = (meaning, minute, seconds) => {
    const task = this.createTask(meaning, minute, seconds);
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
    this.setState(({ todoFilter }) => {
      const newArr = todoFilter.map((el) => (el.id === id ? { ...el, selected: true } : { ...el, selected: false }));
      let status;
      todoFilter.forEach((el) => {
        if (el.id === id) {
          status = el.button;
        }
      });
      return {
        todoFilter: newArr,
        statusActive: status,
      };
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

  createTask(meaning, minute, seconds) {
    return {
      id: this.maxId++,
      time: new Date(),
      meaning,
      timer: +minute * 60 + +seconds,
      done: false,
      edit: false,
      pause: false,
    };
  }

  render() {
    const { todoData, todoFilter, statusActive } = this.state;
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
            statusActive={statusActive}
            onKeyDown={this.onKeyDown}
            onPlay={this.onPlay}
            onPause={this.onPause}
          />
          <Footer todof={todoFilter} todoCount={todoCount} onClickFilter={this.onClickFilter} clear={this.clear} />
        </section>
      </section>
    );
  }
}
