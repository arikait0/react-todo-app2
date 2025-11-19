import React from "react";
import type { Todo } from "./types";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoItem = (props: Props) => {
    const todo = props.todo;
        return (
            <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
                            className="mr-1.5 cursor-pointer"
                            />
                            {todo.name} 
                            <div className="ml-2">
                                {"★".repeat(4 - todo.priority)}
                            </div> 
                            {todo.deadline && (
                                <span className={twMerge(
                                    "ml-2 rounded-md px-2 py-1 text-sm font-bold text-white",
                                    dayjs(todo.deadline).isBefore(dayjs(), "day")
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                                )}>
                                    締切: {dayjs(todo.deadline).format("MM/DD")}
                                </span>
                            )}
                        </div>
                        <div>
                            <button
                            onClick={() => props.remove(todo.id)}
                            className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
                            >
                            削除
                            </button>
                    </div>
                </div>
            
    )
}

export default TodoItem;