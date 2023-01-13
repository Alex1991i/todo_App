import PropTypes from 'prop-types';

import Task from '../task/task';

function TaskList({ onDeleted, onToggleDone, todos, onEdit, onKeyDown, filterId }) {
  let todoFilter;
  switch (filterId) {
    case 2:
      todoFilter = todos.filter((el) => !el.done);
      break;
    case 3:
      todoFilter = todos.filter((el) => el.done);
      break;
    default:
      todoFilter = todos.filter((el) => el);
  }
  const elements = todoFilter.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        key={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={() => onEdit(id)}
        onKeyDown={(e) => onKeyDown(id, e)}
      />
    );
  });

  return <ul className="todo-list"> {elements}</ul>;
}

TaskList.defaultProps = {
  filterId: 1,
};

TaskList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  filterId: PropTypes.number,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      time: PropTypes.instanceOf(Date),
      meaning: PropTypes.string,
      done: PropTypes.bool,
      edit: PropTypes.bool,
    })
  ).isRequired,
};

export default TaskList;
