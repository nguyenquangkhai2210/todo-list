import React from "react";

const FormNote = () => {
  const handleCopyText = (text: string) => {
    const input = document.body.appendChild(document.createElement("input"));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand("copy");
    input?.parentNode?.removeChild(input);
  };

  return (
    <>
      <label
        title="Copy User Id"
        className="Form__note"
        onClick={() => handleCopyText("firstUser")}
      >
        User Id: firstUser
      </label>
      <label
        title="Copy Password"
        className="Form__note"
        onClick={() => handleCopyText("example")}
      >
        Password: example
      </label>
    </>
  );
};

export default React.memo(FormNote);
