import PropTypes from 'prop-types';
import './tasksFilter.css';

function TaskFilter({ button, onClickFilter }) {
  return (
    <button type="button" className={button === 'All' ? 'selected' : ''} onClick={onClickFilter}>
      {button}
    </button>
  );
}

TaskFilter.propTypes = {
  button: PropTypes.string.isRequired,
  onClickFilter: PropTypes.func.isRequired,
};

export default TaskFilter;
