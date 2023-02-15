import { Alert } from 'antd';
import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minute: '',
    seconds: '',
    error: false,
  };

  onLabelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onKeyDown = (e) => {
    const { label, minute, seconds } = this.state;
    const { onAdd } = this.props;
    if (e.keyCode === 13) {
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(minute) && !isNaN(seconds)) {
        onAdd(label, minute, seconds);
        this.setState({
          label: '',
          minute: '',
          seconds: '',
          error: false,
        });
      } else {
        this.setState({
          error: true,
        });
      }
    }
  };

  render() {
    const { label, minute, seconds, error } = this.state;
    const err = error ? <Alert type="error" message="Введены невалидные данные" /> : null;

    return (
      // eslint-disable-next-line react/jsx-fragments
      <React.Fragment>
        <form className="header new-todo-form" onKeyDown={this.onKeyDown}>
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="Task"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={this.onLabelChange}
            value={label}
            name="label"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            name="minute"
            onChange={this.onLabelChange}
            value={minute}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            name="seconds"
            onChange={this.onLabelChange}
            value={seconds}
          />
        </form>
        {err}
      </React.Fragment>
    );
  }
}
