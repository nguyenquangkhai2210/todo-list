import React, { useCallback } from "react";

/* Components */
import Button from "src/common/Button";

type Props = {
  showing: string,
}

const TodoHeader = ({ showing }: Props) => {

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, []);

  return (
      <div className="ToDo__header">
        <label>
          Status:
          <span className={showing.toLocaleLowerCase()}> {showing} </span>
        </label>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
  );
};

export default React.memo(TodoHeader);
