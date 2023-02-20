import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

function Task(props) {
  const { time, meaning, onDeleted, done, onToggleDone, onEdit, edit, onKeyDown, timer, onPlay, onPause, checked } =
    props;
  const [label, setLabel] = useState(meaning);

  const classNames = require('classnames');
  const classStatus = classNames({
    active: !done && !edit,
    completed: done,
    editing: edit,
  });

  const timerView = done
    ? '00:00'
    : `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`;

  return (
    <li className={classStatus}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} checked={checked} />
        <label>
          <span className="title">{meaning}</span>
          <span className="description">
            <button type="button" className="icon icon-play" aria-label="Play" onClick={onPlay} />
            <button type="button" className="icon icon-pause" aria-label="Pause" onClick={onPause} />
            {timerView}
          </span>
          <span className="description">
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
      {classStatus === 'editing' && (
        <input
          type="text"
          className="edit"
          onKeyDown={onKeyDown}
          onChange={(e) => setLabel(e.target.value)}
          value={label}
        />
      )}
    </li>
  );
}

export default Task;

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
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
};
