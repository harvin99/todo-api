import React, { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import './Todo.css';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      
      const todoData = await todoService.getAllTodos();
      
    setTodos(todoData);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const newTodo = await todoService.addTodo(inputValue);
        setTodos([...todos, newTodo]);
        setInputValue('');
      } catch (err) {
  
        setError('Failed to add todo. Please try again.');
      }
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = await todoService.updateTodoStatus(id, !todoToUpdate.completed);
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Failed to update todo status. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
    }
  };

  const clearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    Promise.all(completedTodos.map(todo => todoService.deleteTodo(todo.id)))
      .then(() => {
        setTodos(todos.filter(todo => !todo.completed));
      })
      .catch(() => {
        setError('Failed to clear completed todos. Please try again.');
      });
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  return (
    <div className="todo-container">
      <h1>todos</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="todo-main">
        <form onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        
        <ul className="todo-list">
          {getFilteredTodos().map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.todo}</span>
              </label>
              <button 
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <div className="todo-footer">
            <span>{activeTodosCount} items left</span>
            <div className="filters">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={filter === 'active' ? 'active' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
            <button className="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
