# Lecture 6/01 - React Forms and Intro to Hooks

- Announcements
    - **Complete all Reading Assignments and Labs in the following modules by Sunday, June 5th at 11:59PM ET**
    - New labs will be released Friday
    - Sign up for Project Evals by Friday or it will count as a ‘no-pass’ the project counts as 50%.
- SWBATs
    - [x]  [Props vs State discussion questions](https://github.com/learn-co-curriculum/react-hooks-dq-props-state)
    - [x]  Create a basic form and show the different moving parts
    - [x]  Create small app with controlled inputs in React (Choose your Adventure)
    - [x]  Use the useState hook
    - [ ]  Implement proper information flow practices in React
    - [x]  Understand the basic premise of the useEffect hook
    - [x]  Use the useEffect hook
    - [x]  Use the dependency array
- Refresher
    - Build out a vanilla JS form
    - example code
        
        ```jsx
        
        <form>
        	<input type='text'></input>
        	<input type='password'></input>
        	<input type='submit'></input>
        </form>
        
        // Wild west form 🤠
        const form = document.querySelector("form")
        
        form.addEventListener("submit", (event) => {
            event.preventDefault()
        
            // Access the form data from the DOM
            const nameInput = event.target.name
        		nameInput.addEventListener("change", (e) => {console.log(e.target.value)})
        
            const passwordInput = event.target.password 
        
            const formData = {
                name: nameInput.value,
                password: passwordInput.value
            }
        
            // Do something with the form data
        })
        ```
        
    - What are the main components that we need to have a functioning form in our vanilla JS SPA?
- Objectives
    - [ ]  Create basic React controlled form and show the different moving parts
    - [x]  Create a note app React app or [TaskLister - React Style](https://github.com/learn-co-curriculum/phase-1-tasklister-mini-project)
        - **ASK -** What is a controlled form VS an HTML form?
            - Answer
                - A controlled form is a form that is controlled by React state whereas an HTML form relies on the DOM.
        - **ASK -** Why do we need a controlled form in React?
            - Answer
                - [With a controlled component, the input’s value is always driven by the React state. While this means you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.](https://reactjs.org/docs/forms.html#:~:text=With%20a%20controlled%20component%2C%20the%20input%E2%80%99s%20value%20is%20always%20driven%20by%20the%20React%20state.%20While%20this%20means%20you%20have%20to%20type%20a%20bit%20more%20code%2C%20you%20can%20now%20pass%20the%20value%20to%20other%20UI%20elements%20too%2C%20or%20reset%20it%20from%20other%20event%20handlers.)

        - Walkthrough
            - What kind of components we might need to accomplish this?
             Goals - We want to have a form:
                
                ![Screen Shot 2022-06-01 at 11.07.31 AM.png](./Export-86abd620-67c2-47fd-8900-1de46a68a2a6/Lecture%206%2001%20-%20React%20Forms%20and%20Intro%20to%20Hooks%204a3566bfe45d4ae7a39ebef23c6a1465/Screen_Shot_2022-06-01_at_11.07.31_AM.png)
                
                Then, we want to be able to fill out our form
                
                ![Screen Shot 2022-06-01 at 11.08.53 AM.png](./Export-86abd620-67c2-47fd-8900-1de46a68a2a6/Lecture%206%2001%20-%20React%20Forms%20and%20Intro%20to%20Hooks%204a3566bfe45d4ae7a39ebef23c6a1465/Screen_Shot_2022-06-01_at_11.08.53_AM.png)
                
                Then we want to be able to render a new note component:
                
                ![Screen Shot 2022-06-01 at 11.08.16 AM.png](./Export-86abd620-67c2-47fd-8900-1de46a68a2a6/Lecture%206%2001%20-%20React%20Forms%20and%20Intro%20to%20Hooks%204a3566bfe45d4ae7a39ebef23c6a1465/Screen_Shot_2022-06-01_at_11.08.16_AM.png)
                
            
            - App
                
                ```jsx
                import "./App.css";
                import StickyNoteContainer from "./components/StickyNoteContainer";
                import StickyNoteForm from "./components/StickyNoteForm";
                import { useState, useEffect } from "react";
                import { v4 as uuidv4 } from "uuid";
                
                // const initialStickyNoteState = [
                //   { title: "First note", content: "Woooo!", id: uuidv4() },
                //   { title: "Second note", content: "Yay!", id: uuidv4() },
                // ];
                
                const apiStickyNoteState = [
                  // {title: "Do the dishes", content: "Don't forget to do the dishes!", id: uuidv4()},
                  // {title: "Mow the lawn", content: "Make sure to use the right mower!", id: uuidv4()}
                ]
                
                const initialStickyNoteFormState = {
                  title: "",
                  content: "",
                };
                
                function App() {
                  const [stickyNotes, setStickyNotes] = useState([]);
                  const [stickyNoteFormData, setStickyNoteFormData] = useState({
                    ...initialStickyNoteFormState,
                  });
                
                  useEffect(() => {
                    // fetch('stickyNoteAPI')
                    // .then(res => json())
                    // .then(json => setStickyNotes(json))
                    setStickyNotes(apiStickyNoteState)
                  }, [])
                
                  function handleStickyNoteFormChange(e) {
                    const name = e.target.name;
                    const value = e.target.value;
                
                    setStickyNoteFormData({
                      ...stickyNoteFormData,
                      [name]: value,
                    });
                  }
                  function handleStickyNoteFormSubmit(e) {
                    e.preventDefault();
                    if (stickyNoteFormData.content && stickyNoteFormData.title) {
                      const newStickyNote = { ...stickyNoteFormData, id: uuidv4() };
                      handleSubmitStickyNotes(newStickyNote);
                      setStickyNoteFormData({ ...initialStickyNoteFormState });
                    }
                  }
                
                  function handleSubmitStickyNotes(stickyNote) {
                    setStickyNotes([...stickyNotes, stickyNote]);
                  }
                
                  function handleClick() {
                    setStickyNotes([
                      ...stickyNotes,
                      { title: "New note", content: "You clicked the button!", id: uuidv4() },
                    ]);
                  }
                
                  function handleDeleteNote(id) {
                    setStickyNotes(stickyNotes.filter((stickyNote) => stickyNote.id !== id));
                  }
                
                  return (
                    <div>
                      <StickyNoteForm
                        handleSubmit={handleStickyNoteFormSubmit}
                        handleChange={handleStickyNoteFormChange}
                        formData={stickyNoteFormData}
                      />
                      <StickyNoteContainer
                        stickyNotes={stickyNotes}
                        handleDeleteNote={handleDeleteNote}
                      />
                      <button onClick={handleClick}>Add Note</button>
                    </div>
                  );
                }
                
                export default App;
                ```
                
            - StickyNotesContainer
                
                ```jsx
                import StickyNote from "./StickyNote";
                import React from "react";
                
                const StickyNoteContainer = ({ stickyNotes, handleDeleteNote }) => {
                  return (
                    <div>
                      <h2>Sticky Notes:</h2>
                      {stickyNotes.length !== 0
                        ? stickyNotes.map((stickyNote) => {
                            return (
                              <StickyNote
                                {...stickyNote}
                                key={stickyNote.id}
                                handleDeleteNote={handleDeleteNote}
                              />
                            );
                          })
                        : "No Sticky Notes"}
                    </div>
                  );
                };
                
                export default StickyNoteContainer;
                ```
                
            - StickyNotes
                
                ```jsx
                import React from 'react'
                
                const StickyNote = ({title, content, id, handleDeleteNote}) => {
                
                    function handleDelete() {
                        handleDeleteNote(id)
                    }
                
                    return <div style={{border: "1px solid black"}}>
                        <h3>{title}</h3>
                        <p>{content}</p>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                }
                
                export default StickyNote
                ```
                
            - StickyNotesForm
                
                ```jsx
                const StickyNoteForm = ({ handleChange, formData, handleSubmit }) => {
                //   const [title, setTitle] = useState("");
                //   const [content, setContent] = useState("");
                
                //   const [formData, setFormData] = useState({...initialFormState})
                
                //   function handleChangeTitle(e) {
                //     setTitle(e.target.value);
                //   }
                
                //   function handleChangeContent(e) {
                //     setContent(e.target.value);
                //   }
                
                    // function handleChangeTitle(e) {
                    //     setFormData({...formData, title: e.target.value})
                    // }
                    // function handleChangeContent(e) {
                    //     setFormData({...formData, content: e.target.value})
                    // }
                
                    // function handleChange(e) {
                    //     const name = e.target.name;
                    //     const value = e.target.value;
                      
                    //     setFormData({
                    //       ...formData,
                    //       [name]: value,
                    //     })
                    // }
                
                //   function handleSubmit(e) {
                //     e.preventDefault();
                //     if (formData.content && formData.title) {
                //       const newStickyNote = { ...formData, id: uuidv4() };
                //       handleSubmitStickyNotes(newStickyNote);
                //       setFormData({...initialFormState});
                //     }
                //   }
                
                  return (
                    <div style={{ textAlign: "center" }}>
                      <h2>Create a new sticky note here!</h2>
                      <form onSubmit={handleSubmit}>
                        <label>Title: </label>
                        <input
                          name="title"
                          type="text"
                          value={formData.title}
                          onChange={handleChange}
                        />
                        <label>Content: </label>
                        <textarea
                          name="content"
                          type="text"
                          value={formData.content}
                          onChange={handleChange}
                        />
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  );
                };
                
                export default StickyNoteForm;
                ```
                
            
    - [x]  Use Effect Hook
    - Walkthrough
        - Set up useEffect
        - What is the useEffect hook
            - By using this Hook, you **tell React that your component needs to do something after render**
        - We will eventually use this to perform our initial fetch to get the data used in our app
        - Think of it as `DOMContentLoaded` with superpowers.
        - **Build out button counter and name input**
            
            ![Screen Shot 2022-06-01 at 11.35.54 AM.png](./Export-86abd620-67c2-47fd-8900-1de46a68a2a6/Lecture%206%2001%20-%20React%20Forms%20and%20Intro%20to%20Hooks%204a3566bfe45d4ae7a39ebef23c6a1465/Screen_Shot_2022-06-01_at_11.35.54_AM.png)
            
            - code
                
                ```jsx
                function App() {
                  const [name, setName] = useState('Thompson')
                  const [count, setCount] = useState(0)
                
                  useEffect(() => {
                    console.log(`running useEffect ran` );
                		console.log(count)
                  })
                
                  return ( 
                    <div className="App">
                      <h1>Name: {name}</h1>
                      <h1>Count: {count}</h1>
                
                			<button onClick={() => setName('Tom')}>Change Name</button>
                      <button onClick={() => {setCount(() => {
                        const newCount = count + 1
                        setCount(newCount)
                      })}}>Add To Count</button>
                    </div>
                  );
                }
                
                export default App;
                ```
                
        
        - We can run into a problem with this - The Infinite Loop `useEfffect`
            
            ![Untitled](./Export-86abd620-67c2-47fd-8900-1de46a68a2a6/Lecture%206%2001%20-%20React%20Forms%20and%20Intro%20to%20Hooks%204a3566bfe45d4ae7a39ebef23c6a1465/Untitled.png)
            
        - Stopping the infinite loop `useEffect`
            
            ![Untitled](./Export-86abd620-67c2-47fd-8900-1de46a68a2a6/Lecture%206%2001%20-%20React%20Forms%20and%20Intro%20to%20Hooks%204a3566bfe45d4ae7a39ebef23c6a1465/Untitled%201.png)
            
        - Dependency array
            - We have control over when the `useEffect` hook fires
            - The dependency array should contain any state values that should trigger the useEffect hook to run when they change.
            
            - Demonstrate ***without*** array - constantly runs on state update
            - Demonstrate **with** array - runs once
            - Demonstrate with dependencies