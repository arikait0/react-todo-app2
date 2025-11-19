import React from "react";
import type { Todo } from "./types";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

type Props = {
  todos: Todo[];
};

const WeekTodoList = (props: Props) => {
  const updatedWeekTodos = props.todos.filter((todo) => (
    dayjs(todo.deadline).isSame(dayjs(),"day")
  ));
  const todos = updatedWeekTodos;
  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        今日のタスクはありません。
      </div>
    );
  }

  return (
    <div className=" mb-5 space-y-2 rounded-md border p-3">
      <h2 className="text-lg font-bold">毎週のタスク</h2>
      {todos.map((todo) => (
        <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {todo.name}
                    <div className="ml-2">
                      {"★".repeat(4 - todo.priority)}
                    </div> 
                {todo.deadline &&(
                <span className={twMerge(
                    "ml-2 rounded-md px-2 py-1 text-sm font-bold text-white",
                    dayjs(todo.deadline).isBefore(dayjs(),"day")
                    ? "bg-red-500" 
                    : "bg-blue-500"
                )}>
                    締切: {dayjs(todo.deadline).format("MM/DD")}
                </span>
                )}
                </div>
        </div>
      ))}
    </div>
  );
};

export default WeekTodoList;