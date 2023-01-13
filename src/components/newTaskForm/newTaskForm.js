import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onAdd(this.state.label);
    this.setState({
      label: '',
    });
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}
