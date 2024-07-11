/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
  todo: Todo;
  updateTodo?: (todo: Todo) => void;
  deletTodo?: (todo: Todo) => void;
  toggleError?: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  updateTodo = () => {},
  deletTodo = () => {},
  toggleError,
}) => {
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIsCompleted = (paramTodo: Todo) => {
    const newTodo = { ...paramTodo, completed: !paramTodo.completed };

    updateTodo(newTodo);
  };

  const handleDeleteButton = () => {
    setCurrentTodo(todo);
    deletTodo(todo);
  };

  const handleDoubleClick = (event: ChangeEvent<HTMLInputElement>) => {
    setTempTitle(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!tempTitle) {
      handleDeleteButton();
    }

    if (todo.title === tempTitle) {
      setIsEdited(false);
    }

    setIsSubmitting(true);
    if (todo.title !== tempTitle) {
      const newTodo = { ...todo, title: tempTitle };

      updateTodo(newTodo);
    }

    setIsSubmitting(false);
    setIsEdited(false);
  };

  // const handleEscClick = () => {

  // }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleIsCompleted(todo)}
        />
      </label>
      {!isEdited ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEdited(true);
            }}
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteButton}
          >
            ×
          </button>
        </>
      ) : (
        // {/* This form is shown instead of the title and remove button */}
        <form onSubmit={handleFormSubmit}>
          <input
            // name="title"
            value={tempTitle}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onChange={handleDoubleClick}
            onBlur={handleFormSubmit}
            // onKeyDown={handleEscClick}
          />
        </form>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': !todo.id || currentTodo || isSubmitting || toggleError,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
