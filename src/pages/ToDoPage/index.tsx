import React, { useEffect, useMemo, useReducer, useState } from "react";

/* Services */
import Service from "src/service";

/* Actions */
import { setTodos } from "src/store/actions";

/* Reducers */
import reducer, { initialState } from "src/store/reducer";

/* Models */
import { EnhanceTodoStatus } from "src/models/todo";

/* Utils */
import { isTodoCompleted } from "src/utils";

/* Components */
import TodoCreation from "src/pages/ToDoPage/TodoCreation";
import TodoItem from "src/pages/ToDoPage/TodoItem";
import TodoToolbar from "src/pages/ToDoPage/TodoToolbar";
import TodoHeader from "src/pages/ToDoPage/TodoHeader";

/* Hook */
import {
  useCreate,
  useUpdate,
  useUpdateAll,
  useDelete,
  useDeleteAll,
} from "src/pages/ToDoPage/handleApi";

const ToDoPage = ({ ...props }) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  const {
    handleCreateTodo,
    clearErrorCreate,
    errorCreate,
    messageCreate,
  } = useCreate(dispatch);
  const {
    handleUpdateTodo,
    clearErrorUpdate,
    errorUpdate,
    messageUpdate,
  } = useUpdate(dispatch);
  const { handleUpdateAllTodo } = useUpdateAll(dispatch);
  const { handleDeleteTodo } = useDelete(dispatch);
  const { handleDeleteAllTodo } = useDeleteAll(dispatch);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const resp = await Service.getTodos();
    dispatch(setTodos(resp || []));
  };

  const activeTodos = useMemo(() => {
    return todos.reduce(function (accum, todo) {
      return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
  }, [todos]);

  return (
    <div className="ToDo__container">
      <TodoHeader showing={showing} />
      <TodoCreation
        handleCreateTodo={handleCreateTodo}
        clearErrorCreate={clearErrorCreate}
        errorCreate={errorCreate}
        messageCreate={messageCreate}
      />
      <div className="ToDo__list">
        {todos.reduce<JSX.Element[]>((prev, todo, index) => {
          if (showing === "ALL" || showing === todo.status) {
            prev.push(
              <TodoItem
                key={index}
                todo={todo}
                handleUpdateTodo={handleUpdateTodo}
                clearErrorUpdate={clearErrorUpdate}
                errorUpdate={errorUpdate}
                messageUpdate={messageUpdate}
                handleDeleteTodo={handleDeleteTodo}
              />
            );
          }
          return prev;
        }, [])}
      </div>
      <TodoToolbar
        setShowing={setShowing}
        activeTodos={activeTodos === 0}
        showCheckBox={todos.length > 0}
        handleDeleteAllTodo={handleDeleteAllTodo}
        handleUpdateAllTodo={handleUpdateAllTodo}
      />
    </div>
  );
};

export default React.memo(ToDoPage);
