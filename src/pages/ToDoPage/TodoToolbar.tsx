import React, { useCallback } from "react";

/* Models */
import { TodoStatus, EnhanceTodoStatus } from "src/models/todo";

/* Components */
import Button from "src/common/Button";
import Input from "src/common/Input";

type Props = {
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
  activeTodos: boolean;
  showCheckBox: boolean;
  handleDeleteAllTodo: () => Promise<void>;
  handleUpdateAllTodo: (checked: boolean) => Promise<void>;
}

const ToDoPage = ({
  setShowing,
  activeTodos,
  showCheckBox,
  handleDeleteAllTodo,
  handleUpdateAllTodo
}: Props) => {

  const onToggleAllTodo =  useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked =  e.target.checked;

    handleUpdateAllTodo(checked)
  }, [handleUpdateAllTodo]);

  const showingAll = useCallback(() => {
    setShowing("ALL");
  }, [setShowing]);

  const showingACTIVE = useCallback(() => {
    setShowing(TodoStatus.ACTIVE);
  }, [setShowing]);

  const showingCOMPLETED = useCallback(() => {
    setShowing(TodoStatus.COMPLETED);
  }, [setShowing]);

  return (
    <div className="Todo__toolbar">
      {showCheckBox ? (
        <Input
          type="checkbox"
          checked={activeTodos}
          onChange={onToggleAllTodo}
        />
      ) : null}
      <div className="Todo__tabs">
        <Button onClick={showingAll}>All</Button>
        <Button onClick={showingACTIVE}>Active</Button>
        <Button onClick={showingCOMPLETED}>Completed</Button>
      </div>
      <Button onClick={handleDeleteAllTodo}>Clear all todos</Button>
    </div>
  );
};

export default React.memo(ToDoPage);
