import { FC } from 'react';

interface TodoProps {
  title: string;
  completed: boolean;
  onDelete: () => void;
}

const TodoCard: FC<TodoProps> = ({ title, completed, onDelete }) => {
  return (
    <div className="flex bg-gray-50 mb-4 justify-between items-center p-4 border border-gray-300 rounded-md">
      <div className="flex items-center">
        <span className={completed ? 'line-through text-gray-500' : ''}>
          {title}
        </span>
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoCard;
