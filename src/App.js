
import React, { useState } from 'react';
import './App.css';
function App() {
  const [todos, setTodos] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTodo = () => {
    if (textInput.trim() !== '') {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: textInput, image: selectedImage },
      ]);
      setTextInput('');
      setSelectedImage(null);
    }
  };

  const handleRemoveTodo = (index) => {
     setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={textInput}
        onChange={handleTextChange}
      />
      <label htmlFor="image-upload" className="file-upload-label">
        Select Image
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.image && <img src={todo.image} alt="Todo" />}
            <span>{todo.text}</span>
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;
