/* eslint-disable no-param-reassign */
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { wait } from '../../utils/fetchClient';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSubmit: (title: string) => Promise<void>;
  setTitleError: (value: boolean) => void;
  updateTodo: (todo: Todo) => void;
  setToggleError: (toggle: boolean) => void;
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  setTitleError,
  todos,
  updateTodo,
  setToggleError,
}) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);
  const [trig, setTrig] = useState(false);

  useEffect(() => {
    titleField.current?.focus();
  }, [title, isSubmitting, onSubmit]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      wait(3000).then(() => setTitleError(false));
    }

    if (title.trim()) {
      setIsSubmitting(true);
      onSubmit(title.trim())
        .then(() => {
          setTitle('');
        })
        .catch(() => setTitle(title))
        .finally(() => setIsSubmitting(false));
    }
  };

  const handleToggleAllTodo = () => {
    if (!trig) {
      setToggleError(true);

      todos.forEach(currentTodo => {
        const newTodo = {
          ...currentTodo,
          completed: (currentTodo.completed = true),
        };

        updateTodo(newTodo);
      });

      setToggleError(false);

      setTrig(true);
    }

    if (trig) {
      setToggleError(true);

      setToggleError(true);

      todos.forEach(currentTodo => {
        setToggleError(true);

        const newTodo = {
          ...currentTodo,
          completed: (currentTodo.completed = false),
        };

        updateTodo(newTodo);
        setToggleError(false);
      });

      setTrig(false);
    }
  };

  return (
    <>
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: trig })}
        data-cy="ToggleAllButton"
        onClick={handleToggleAllTodo}
      />
      <form onSubmit={handleFormSubmit}>
        <input
          value={title}
          ref={titleField}
          autoFocus
          disabled={isSubmitting}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitleChange}
        />
      </form>
    </>
  );
};
