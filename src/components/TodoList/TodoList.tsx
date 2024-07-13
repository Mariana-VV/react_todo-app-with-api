import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  updateTodo: (todo: Todo) => Promise<void>;
  deletTodo: (todo: Todo) => void;
  array: Todo[];
  setTempArray: (todo: Todo) => void;
  edit: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodo,
  deletTodo,
  array,
  setTempArray,
}) => {
  return (
    <>
      {/* This is a completed todo */}
      {todos.map(todo => (
        <section className="todoapp__main" data-cy="TodoList" key={todo.id}>
          <TodoItem
            todo={todo}
            updateTodo={updateTodo}
            deletTodo={deletTodo}
            tempArray={array}
            setTempArray={setTempArray}
          />
        </section>
      ))}
    </>
  );
};
