
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { categories } from '../entities/categories';

export const getAllCategories = async (req: Request, res: Response) => {
  const categoryRepository = getRepository(categories);
  try {
    const categories = await categoryRepository.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const categoryRepository = getRepository(categories);
  try {
    const newCategory = categoryRepository.create({ name });
    await categoryRepository.save(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const category_id = req.params.id;
  const categoryRepository = getRepository(categories);
  const updatedCategoryData = req.body;
  try {
    const category = await categoryRepository.findOneById(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    categoryRepository.merge(category, updatedCategoryData);
    await categoryRepository.save(category);
    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const deleteCategory = async (req: Request, res: Response) => {
  const category_id = req.params.id;
  const categoryRepository = getRepository(categories);
  const category = await categoryRepository.findOneById(category_id);
  try {
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await categoryRepository.delete(category);
    
    res.status(204).json({});
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
