import { useState, useCallback } from 'react';
import { categoryAPI } from '../api/services';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await categoryAPI.getAll();
      setCategories(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Xato yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (catData) => {
    const { data } = await categoryAPI.create(catData);
    setCategories((prev) => [data.data, ...prev]);
    return data.data;
  }, []);

  const updateCategory = useCallback(async (id, catData) => {
    const { data } = await categoryAPI.update(id, catData);
    setCategories((prev) => prev.map((c) => (c._id === id ? data.data : c)));
    return data.data;
  }, []);

  const deleteCategory = useCallback(async (id) => {
    await categoryAPI.delete(id);
    setCategories((prev) => prev.filter((c) => c._id !== id));
  }, []);

  return { categories, loading, error, fetchCategories, createCategory, updateCategory, deleteCategory };
};
