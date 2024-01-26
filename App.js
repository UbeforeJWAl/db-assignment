import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    const newTask = { task: task };
    setTasks([...tasks, newTask]);
    setTask(""); // Clear input after submitting
  }

  const deleteTask = (taskId) => {
    // Replace 'http://localhost:3000' with the actual URL of your backend
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(message => {
        console.log(message);
        // Update the tasks state by removing the deleted task
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  }

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    // Replace 'http://localhost:3000' with the actual URL of your backend
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <form action='' onSubmit={submitForm}>
        <div>
          <h1>TO DO LIST APP</h1>
          <label> Enter the task : </label>
          <input
            name="addTask"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      </form>

      <div>
        {tasks.map((curElem) => (
          <div key={curElem.id}>
            <p>
              <textarea>{curElem.task}</textarea>
              <span> </span>
              <button onClick={() => deleteTask(curElem.id)}>X</button>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;



