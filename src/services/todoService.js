const API_BASE_URL = 'https://dummyjson.com';

export const todoService = {
  async getAllTodos() {
    debugger
    const response = await fetch(`${API_BASE_URL}/todos`);
    const data = await response.json();
    return data.todos;
  },

  async addTodo(todoText) {
    const response = await fetch(`${API_BASE_URL}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: todoText,
        completed: false,
        userId: 163, // Using the same userId as in the example
      })
    });
    return await response.json();
  },

  async updateTodoStatus(todoId, completed) {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    return await response.json();
  },

  async deleteTodo(todoId) {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
};
