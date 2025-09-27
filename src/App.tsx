import { useState } from "react";

// Type for a single todo item
interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [inputValue, setInputValue] = useState("");

	const handleAddTodo = () => {
		if (inputValue.trim() === "") return;
		const newTodo: Todo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
		};
		setTodos([...todos, newTodo]);
		setInputValue("");
	};

	const handleToggleComplete = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const handleDeleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="relative h-full w-full [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
			<div className="bg-slate-950  text-[#f0f0f0] min-h-screen flex flex-col items-center p-8 font-mono ">
				<h1 className="text-4xl text-white mb-8 [text-shadow:0_0_5px_#fff,0_0_10px_#0ff]">
					F U T U R E _ T A S K
				</h1>
				<div className="flex mb-8">
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
						className="bg-[#1a1a1a] text-[#f0f0f0] border border-cyan-400 py-2 px-4 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-500"
						placeholder="Enter new task..."
					/>
					<button
						onClick={handleAddTodo}
						className="bg-transparent text-cyan-400 border border-cyan-400 py-2 px-4 ml-2 cursor-pointer text-base transition-colors duration-300 hover:bg-cyan-400 hover:text-[#0a0a0a]"
					>
						ADD
					</button>
				</div>
				<ul className="list-none p-0 w-full max-w-md">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className={`bg-[#1a1a1a] border p-4 mb-2 flex justify-between items-center transition-colors duration-300 ${
								todo.completed ? "border-gray-700" : "border-cyan-400"
							}`}
						>
							<span
								className={todo.completed ? "line-through text-gray-500" : ""}
							>
								{todo.text}
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => handleToggleComplete(todo.id)}
									className={`bg-transparent border py-1 px-2 cursor-pointer transition-colors duration-300 ${
										todo.completed
											? "text-green-400 border-green-400 hover:bg-green-400 hover:text-[#0a0a0a]"
											: "text-gray-300 border-gray-300 hover:bg-gray-300 hover:text-[#0a0a0a]"
									}`}
								>
									{todo.completed ? "Undo" : "Done"}
								</button>
								<button
									onClick={() => handleDeleteTodo(todo.id)}
									className="bg-transparent border border-red-500 text-red-500 py-1 px-2 cursor-pointer transition-colors duration-300 hover:bg-red-500 hover:text-white"
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
