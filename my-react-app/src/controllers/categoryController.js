import { useState, useEffect } from 'react';
import * as categoryModel from '../api/categoryModel';

export const useCategoryController = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryModel.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories. Please try again.'); 
    } finally {
      setLoading(false);
    }
  };

  const createNewCategory = async (categoryData) => {
    setError(null); 
    try {
      await categoryModel.createCategory(categoryData);
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Error creating category. Please try again.');
    }
  };

  const updateCategoryData = async (categoryId, categoryData) => {
    setError(null);
    try {
      await categoryModel.updateCategory(categoryId, categoryData);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Error updating category. Please try again.'); 
    }
  };

  const deleteCategoryData = async (categoryId) => {
    setError(null);
    try {
      await categoryModel.deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Error deleting category. Please try again.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createNewCategory,
    updateCategoryData,
    deleteCategoryData,
  };
};
