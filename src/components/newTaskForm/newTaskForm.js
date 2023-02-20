import { Alert } from 'antd';
import React, { useState } from 'react';

function NewTaskForm(props) {
  const [task, setTask] = useState({ label: '', minute: '', seconds: '', error: false });

  const onKeyDown = (e) => {
    const { label, minute, seconds } = task;
    const { onAdd } = props;
    if (e.keyCode === 13) {
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(minute) && !isNaN(seconds) && label) {
        onAdd(label, minute, seconds);
        setTask({
          label: '',
          minute: '',
          seconds: '',
          error: false,
        });
      } else {
        setTask((el) => ({ ...el, error: true }));
      }
    }
  };

  const { label, minute, seconds, error } = task;
  const err = error ? <Alert type="error" message="Введены невалидные данные" /> : null;

  return (
    <>
      <form className="header new-todo-form" onKeyDown={onKeyDown}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="Task"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={(e) => setTask((el) => ({ ...el, label: e.target.value }))}
          value={label}
          name="label"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="minute"
          onChange={(e) => setTask((el) => ({ ...el, minute: e.target.value }))}
          value={minute}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="seconds"
          onChange={(e) => setTask((el) => ({ ...el, seconds: e.target.value }))}
          value={seconds}
        />
      </form>
      {err}
    </>
  );
}

export default NewTaskForm;
