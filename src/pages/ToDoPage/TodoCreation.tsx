import React, { useRef } from "react";

/* Components */
import Input from "src/common/Input";

type Props = {
  handleCreateTodo: (value: string) => Promise<void>;
  clearErrorCreate: () => void;
  errorCreate: boolean;
  messageCreate: string
}

const TodoCreation = ({
  handleCreateTodo, clearErrorCreate, errorCreate, messageCreate
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const content = inputRef.current.value;
      handleCreateTodo(content);
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  };

  const clearWhitespace = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrorCreate();
    e.currentTarget.value = e.currentTarget.value.replace(/^\s+$/, "");
  };

  return (
    <div className="Todo__creation">
      <Input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
        onChange={clearWhitespace}
        onBlur={clearErrorCreate}
        error={errorCreate}
        messageError={messageCreate}
      />
    </div>
  );
};

export default React.memo(TodoCreation);
