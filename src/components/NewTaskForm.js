import React, { useState } from "react";
// import { uuid as V4 } from "uuidv4";

function NewTaskForm() {
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState("");
  // const inputValue = "This is the starting value"

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function valdateInput(input) {
    return inputValue.length > 8;
  }

  function handleSubmitForm(e) {
      e.preventDefault()
    if (valdateInput(inputValue)) {
      const newTask = {
        content: inputValue,
        id: Math.random(),
      };
      console.log(newTask)
      // sendToAppComponent(newTask)
    } else {    
        setErrors("Input must contain at least 8 characters")
    }
  }

  return (
    <>
      <h1 className="errors">{errors}</h1>
      <form id="create-task-form" onSubmit={(e) => {handleSubmitForm(e)}}>
        <label>New Task Description: </label>
        <input
          type="text"
          id="new-task"
          placeholder="description"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <input type="submit" value="Create New Task"></input>
      </form>
    </>
  );
}

export default NewTaskForm;

// const form = document.getElementById("create-task-form")
// form.addEventListener("submit", () => {console.log("Submitted")})

{
  /* <form id="create-task-form" action="" method="POST">
<label for="new-task-description">Task description:</label>
<input type="text" id="new-task-description" name="new-task-description" placeholder="description">
<input type="submit" value="Create New Task">
</form> */
}
