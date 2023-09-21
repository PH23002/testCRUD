import React, { useState } from 'react';
import { Table, Modal, Form, Input, Button, Space } from 'antd';
import { useCategoryController } from './controllers/categoryController';


const App = () => {
  const {
    categories,
    loading,
    createNewCategory,
    updateCategoryData,
    deleteCategoryData,
  } = useCategoryController();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  // Hàm hiển thị modal thêm danh mục
  const showModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  // Hàm xử lý khi nhấn nút "Add Category"
  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      if (editingCategory) {
        // Nếu đang sửa, cập nhật danh mục
        await updateCategoryData(editingCategory.category_id, values);
      } else {
        // Ngược lại, thêm danh mục mới
        await createNewCategory(values);
      } 
      form.resetFields();
      setEditingCategory(null); 
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating/updating category:', error);
    }
  };

  // Hàm xử lý khi nhấn nút "Edit"
  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingCategory(record);
    setModalVisible(true);
  };

  // Hàm xử lý khi nhấn nút "Delete"
  const handleDelete = async (record) => {
    try {
      await deleteCategoryData(record.category_id);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="App">
      <h1>Categories</h1>
      <Button type="primary" onClick={showModal}>
        Add Category
      </Button>
      <Table dataSource={categories} columns={columns} loading={loading} />

      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => {
          form.resetFields();
          setEditingCategory(null);
          setModalVisible(false);
        }}
      >
        <Form form={form} layout="vertical" name="category_form">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the category name' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
