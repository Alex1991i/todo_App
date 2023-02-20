import { useEffect, useState } from 'react';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';
import './app.css';

function App() {
  const [maxId, setMaxId] = useState(0);
  const [todoData, setTodoData] = useState([]);
  const [todoFilter, setTodoFilter] = useState([
    { id: 1, button: 'All', selected: true },
    { id: 2, button: 'Active', selected: false },
    { id: 3, button: 'Completed', selected: false },
  ]);
  const [statusActive, setStatusActive] = useState('All');

  useEffect(() => {
    let interval;
    setInterval(() => {
      interval = setTodoData((data) => {
        const newArr = data.map((el) => {
          if (el.timer === 0) {
            return el;
          }
          if (!el.pause) {
            // eslint-disable-next-line no-param-reassign
            el.timer -= 1;
          }
          return el;
        });
        return newArr;
      });
    }, 1000);
    return clearInterval(interval);
  }, [todoData.timer]);

  const onPlay = (id) => {
    setTodoData((data) => {
      const newArr = data.map((el) => (el.id === id ? { ...el, pause: false } : { ...el }));
      return newArr;
    });
  };

  const onPause = (id) => {
    setTodoData((data) => {
      const newArr = data.map((el) => (el.id === id ? { ...el, pause: true } : { ...el }));
      return newArr;
    });
  };

  const deleteTask = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const createTask = (meaning, minute, seconds) => {
    setMaxId((id) => id + 1);
    return {
      id: maxId,
      time: new Date(),
      meaning,
      timer: +minute * 60 + +seconds,
      done: false,
      edit: false,
      pause: false,
    };
  };

  const addTask = (meaning, minute, seconds) => {
    const task = createTask(meaning, minute, seconds);
    setTodoData((data) => [...data, task]);
  };

  const onToggle = (id, name) => {
    setTodoData((data) => {
      const newArr = data.map((todo) => (todo.id === id ? { ...todo, [name]: !todo[name] } : { ...todo }));
      return newArr;
    });
  };

  const onToggleEdit = (id) => {
    onToggle(id, 'edit');
  };

  const onToggleDone = (id) => {
    onToggle(id, 'done');
  };

  const onClickFilter = (id) => {
    setTodoFilter((filter) => {
      const newArr = filter.map((el) => (el.id === id ? { ...el, selected: true } : { ...el, selected: false }));
      return newArr;
    });
    todoFilter.forEach((el) => {
      if (el.id === id) {
        setStatusActive(el.button);
      }
    });
  };

  const clear = () => {
    setTodoData((data) => {
      const newArr = data.filter((todo) => !todo.done);
      return newArr;
    });
  };

  const onKeyDown = (id, e) => {
    if (e.keyCode === 13) {
      setTodoData((data) => {
        const newArr = data.map((todo) =>
          todo.id === id ? { ...todo, edit: false, meaning: e.target.value } : { ...todo }
        );
        return newArr;
      });
    }
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addTask} />
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onEdit={onToggleEdit}
          statusActive={statusActive}
          onKeyDown={onKeyDown}
          onPlay={onPlay}
          onPause={onPause}
        />
        <Footer todof={todoFilter} todoCount={todoCount} onClickFilter={onClickFilter} clear={clear} />
      </section>
    </section>
  );
}

export default App;
