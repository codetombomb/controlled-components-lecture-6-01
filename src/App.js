import "./App.css";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import React from "react";

function App() {
  const [name, setName] = React.useState("Thompson")
  const [counter, setCounter] = React.useState(0)

  console.log(React.useEffect)

  React.useEffect(() => {
    console.log("Component is rendered");
  }, []);

  return (
    <div id="main-content">
      <Header />
      <NewTaskForm />
      <button onClick={() => setCounter(counter + 1)}>change to tom</button>
    </div>
  );
}

export default App;

// Header
// Label Text input (NewTaskForm component)
// Container component for the list

// function useEffect(create, deps) {
//   var dispatcher = resolveDispatcher();
//   return dispatcher.useEffect(create, deps);
// }
