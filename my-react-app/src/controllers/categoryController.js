import { useState, useEffect } from 'react';
import * as categoryModel from '../api/categoryModel';

export const useCategoryController = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Thêm state để lưu trữ lỗi

  const fetchCategories = async () => {
    setLoading(true);
    setError(null); // Xóa lỗi trước khi thực hiện lệnh
    try {
      const data = await categoryModel.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories. Please try again.'); // Thiết lập lỗi vào state
    } finally {
      setLoading(false);
    }
  };

  const createNewCategory = async (categoryData) => {
    setError(null); // Xóa lỗi trước khi thực hiện lệnh
    try {
      await categoryModel.createCategory(categoryData);
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Error creating category. Please try again.'); // Thiết lập lỗi vào state
    }
  };

  const updateCategoryData = async (categoryId, categoryData) => {
    setError(null); // Xóa lỗi trước khi thực hiện lệnh
    try {
      await categoryModel.updateCategory(categoryId, categoryData);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Error updating category. Please try again.'); // Thiết lập lỗi vào state
    }
  };

  const deleteCategoryData = async (categoryId) => {
    setError(null); // Xóa lỗi trước khi thực hiện lệnh
    try {
      await categoryModel.deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Error deleting category. Please try again.'); // Thiết lập lỗi vào state
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error, // Trả về lỗi để hiển thị cho người dùng
    createNewCategory,
    updateCategoryData,
    deleteCategoryData,
  };
};
