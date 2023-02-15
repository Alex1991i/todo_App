import PropTypes from 'prop-types';
import './tasksFilter.css';

function TaskFilter({ button, onClickFilter, selected }) {
  const selectedClass = selected ? 'selected' : null;

  return (
    <button type="button" className={selectedClass} onClick={onClickFilter}>
      {button}
    </button>
  );
}

TaskFilter.propTypes = {
  button: PropTypes.string.isRequired,
  onClickFilter: PropTypes.func.isRequired,
};

export default TaskFilter;
