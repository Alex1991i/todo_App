import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    label: this.props.meaning,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    const { time, meaning, onDeleted, done, onToggleDone, onEdit, edit, onKeyDown } = this.props;
    const { label } = this.state;

    let classNames = 'active';
    if (done) {
      classNames = 'completed';
    }
    if (edit) {
      classNames = 'editing';
    }
    return (
      <li className={classNames} onClick={onToggleDone}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{meaning}</span>
            <span className="created">
              created{' '}
              {formatDistanceToNow(time, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit} aria-label="Edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete" />
        </div>
        {classNames === 'editing' && (
          <input type="text" className="edit" onKeyDown={onKeyDown} onChange={this.onLabelChange} value={label} />
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  done: false,
  edit: false,
};

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  meaning: PropTypes.string.isRequired,
  done: PropTypes.bool,
  edit: PropTypes.bool,
};
