/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

import TaskFilter from '../tasksFilter/tasksFilter';
import './footer.css';

function Footer({ todof, todoCount, onClickFilter, clear }) {
  const elements = todof.map((item) => {
    const { id } = item;
    return (
      <li key={id}>
        <TaskFilter {...item} onClickFilter={() => onClickFilter(id)} />
      </li>
    );
  });
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <ul className="filters">{elements}</ul>
      <button type="button" className="clear-completed" onClick={clear}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  todoCount: 0,
};

Footer.propTypes = {
  todof: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      button: PropTypes.string,
    })
  ).isRequired,
  onClickFilter: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  todoCount: PropTypes.number,
};

export default Footer;
