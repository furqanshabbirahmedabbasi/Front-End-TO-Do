'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  _id: string;
  title: string;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to load todos:', error);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodoTitle) return;

    try {
      const response = await axios.post('http://localhost:5000/api/todos', {
        title: newTodoTitle,
      });
      setTodos((prev) => [...prev, response.data]);
      setNewTodoTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError('Failed to add todo. Please try again later.');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos((prev) => prev.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError('Failed to delete todo. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-7 bg-black-900">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <div className="w-full max-w-2xl">
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add new todo"
            className="flex-1 border p-2 rounded-l"
            aria-label="New todo title"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            Add
          </button>
        </div>

        {loading ? (
          <p>Loading todos...</p>
        ) : todos.length === 0 ? (
          <p>No todo found</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-white p-3 mb-2 border rounded"
              >
                <span>{todo.title}</span>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-red-900"
                  aria-label={`Delete todo: ${todo.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
