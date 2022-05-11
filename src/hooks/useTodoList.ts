import { useCallback, useEffect, useState } from "react";
import { TodoType } from "../types";
import axios from "axios";
import { notification } from "antd";

/**
 * React custom hook to management of todo list
 * @returns {object} Todo list and some functions to add, remove and check/uncheck funtionality
 */
export const useTodoList = () => {
  const [myTodos, setMyTodos] = useState<TodoType[]>([]);

  /**
   * Add new todo to the todo list
   * @description
   *  - Submits the new todo to the server
   *  - Saves the new todo in the state.
   * @param {string} title todo title which should be added
   */
  const addNewTodo = useCallback(async (title: string) => {
    try {
      const { data } = await axios.put("/api/add-todo", { title });
      const { todo } = data;

      setMyTodos((prev) => {
        return [...prev, todo];
      });

      notification.success({
        message: "Todo added successfully",
        duration: 1,
        placement: "top",
      });
    } catch (error) {
      notification.error({
        message: `Failed to add todo`,
        placement: "top",
      });
    }
  }, []);

  /**
   * Remove todo by id from todo list
   * @description
   *  - Removes todo from the state.
   * @param {string} id Id of the todo which should be removed
   */
  const removeTodoById = useCallback((id: string): void => {
    setMyTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  }, []);

  /**
   * Change checked status of this todo by id
   * @description
   *  - Checks or unchecks todo from state.
   * @param {string} id Id of the todo which should be checked or unchecked
   * @param {boolean} isDone Flag to determine if the todo should be checked or unchecked
   */
  const changeTodoStatus = useCallback((id: string, isDone: boolean): void => {
    setMyTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, isDone };
      });
    });
  }, []);

  /**
   * Effect to fetch all todo from server
   * @description
   *  - Fetchs all todo from the server
   *  - Sets all todo to the state
   *  - If error occurs
   *    - Shows fail notification
   */
  useEffect(() => {
    const fetchInitialTodosFromDb = async () => {
      try {
        let response = await axios.get("/api/all-todos");
        let { data } = response;
        let { todos } = data;
        setMyTodos(todos);
      } catch (error) {
        notification.error({
          message: `Failed to get todos from server`,
          placement: "top",
        });
      }
    };
    fetchInitialTodosFromDb();
  }, []);

  return { addNewTodo, myTodos, removeTodoById, changeTodoStatus };
};
