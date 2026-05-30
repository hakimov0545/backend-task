import { useState, useCallback } from 'react';
import { taskAPI } from '../api/services';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await taskAPI.getAll(params);
      setTasks(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Xato yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    const { data } = await taskAPI.create(taskData);
    setTasks((prev) => [data.data, ...prev]);
    return data.data;
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    const { data } = await taskAPI.update(id, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? data.data : t)));
    return data.data;
  }, []);

  const deleteTask = useCallback(async (id) => {
    await taskAPI.delete(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }, []);

  return { tasks, pagination, loading, error, fetchTasks, createTask, updateTask, deleteTask };
};
