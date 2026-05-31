import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export function TodoList() {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        setInput('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Мои дела</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Что нужно сделать?"
                />
                <button
                    onClick={addTodo}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Добавить
                </button>
            </div>

            <ul className="space-y-2">
                {todos.map(todo => (
                    <li key={todo.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-4 h-4"
                        />
                        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                            {todo.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

