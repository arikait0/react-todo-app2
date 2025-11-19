import { useState, useEffect } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./Todolist";
import WeekTodoList from "./WeekTodoList";
import { v4 as uuid } from "uuid"; // ◀◀ 追加
import { twMerge } from "tailwind-merge"; // ◀◀ 追加
import dayjs from "dayjs";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodTodoPriority] = useState(3); 
  const [newTodoDeadline, setnewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [newWeekTodos, setNewWeekTodos] = useState(false);
  const [weekTodos, setWeekTodos] = useState<Todo[]>([]);

  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
        if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);
  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const uncompletedCount = todos.filter(
    (todo: Todo) => !todo.isDone && !todo.isWeek
  ).length;
  
  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };
  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodTodoPriority(Number(e.target.value));
  }
  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setnewTodoDeadline(dt ==="" ? null :new Date(dt));
  };
  const updateWeekTodos = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setNewWeekTodos(e.target.checked);
  }
  const updateIsDone = (id: string,value: boolean) => {
    const updateTodos = todos.map((todo) =>{
      if (todo.id === id) {
        return { ...todo, isDone: value };
      } else {
        return todo;
      }
    });
    setTodos(updateTodos);
  };
  const removeCompletedTodos = () => {
    const updateTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updateTodos); 
  };
  const remove = (id: string) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  }
  const WeekTodos = () =>{
    const weektodos = todos.filter((todo) => todo.isWeek );
      // todos が更新されたら毎週タスクのリストを再計算して表示を更新する
    const updateWeekTodos = weektodos.map((todo)=>{
      let currentDeadline = dayjs(todo.deadline);
      while (currentDeadline.isBefore(dayjs(),"day")){
        currentDeadline = currentDeadline.add(7,"day"); 
      }
      return{
        ...todo,
        deadline: currentDeadline.toDate(),
      }

    });
    setWeekTodos(updateWeekTodos);
    const removeOldDeadlines = todos.filter((todo)=> !todo.isWeek );
  }

  useEffect(() => {
    WeekTodos();
  }, [todos]);

  // 追加: addNewTodo関数の実装
  const addNewTodo = () => {
    if (newTodoName.length < 2 || newTodoName.length > 32){
      setNewTodoNameError("2文字以上、32文字以内で入力してください");  
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      isWeek: newWeekTodos,
    };
    // スプレッド構文を使って、末尾に新タスクを追加した配列を作成
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos); // 作成した配列をtodosにセット
    setNewTodoName("");
    setNewTodTodoPriority(3);
    setnewTodoDeadline(null);
    setNewTodoNameError("");
    setNewWeekTodos(false);
  };

  return (
    <div>
      <header className="bg-slate-800 py-2 font-bold text-white">Header</header>
      <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
        <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
        <div className="mb-4">
          <WelcomeMessage
            name="寝屋川タヌキ"
            uncompletedCount={uncompletedCount}
          />
        </div>
        <WeekTodoList todos={weekTodos}/>
        <TodoList todos={todos} updateIsDone={updateIsDone} remove={remove}/>
        <button
          type="button"
          onClick={removeCompletedTodos}
          className={
            "mt-3 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
          }>
          完了したタスクを削除
        </button>

        <div className="mt-5 space-y-2 rounded-md border p-3">
          <h2 className="text-lg font-bold">新しいタスクの追加</h2>

          <div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="newTodoName">
                名前
              </label>
              <input
                id="newTodoName"
                type="text"
                value={newTodoName}
                onChange={updateNewTodoName}
                className={twMerge("grow rounded-md border p-2",
                  newTodoNameError && "border-red-500 outline-red-500"
                )}
                placeholder="2文字以上、32文字以内で入力してください"
              />
            </div>
            {newTodoNameError && (
              <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
              <div>{newTodoNameError}</div>
            </div>
            )}
          </div>
            <div className="flex gap-5">
              <div className="font-bold">優先度</div>
              {[1, 2, 3].map((value) => (
                <label key={value} className="flex items-center space-x-1">
                  <input
                    id={`priority-${value}`}
                    name="priorityGroup"
                    type="radio"
                    value={value}
                    checked={newTodoPriority === value}
                    onChange={updateNewTodoPriority}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>

          <div className="flex gap-5">
            <div className="font-bold">日付</div>
              <input
                type="datetime-local"
                id="deadline"
                value={
                  newTodoDeadline
                    ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                    : ""
                }
                onChange={updateDeadline}
                className="rounded-md border border-gray-400 px-2 py-0.5"
              />
          </div>
          <details>
            <summary className="font-bold">詳細設定</summary>
              <div className="flex gap-5">
              <div className="font-bold">毎週のタスク</div>
              <input
                  type="checkbox"
                  checked={newWeekTodos}
                  onChange={updateWeekTodos}
                  className="mr-1.5 cursor-pointer"
                  />
              </div>
          </details>
          <button
            type="button"
            onClick={addNewTodo} // ボタンを押下したときの処理
            className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
          >
            追加
          </button>
        </div>
      </div>
    </div>
    );
  };

export default App;