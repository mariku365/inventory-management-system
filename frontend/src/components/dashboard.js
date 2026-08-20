
import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, message, Input } from 'antd';
import axios from 'axios';
import Welcome from './welcome'

const DashboardPage = () => {
    const [items, setItems] = useState([]);
    const username = localStorage.getItem('username');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/items',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        ); 
        setItems(res.data);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, []);

  // ✅ Table columns
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₱${price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  // ✅ Action handlers
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
    // navigate to edit form or open modal
  };

  const handleDelete = async (id) => {
    try {
         const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/items/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      );
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <Welcome username={username}/>

        <Modal
            title = "Edit Item"
            open = {isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}>

            <Form
                layout="vertical"
                initialValues={{
                    quantity: editingItem?.quantity,
                    price: editingItem?.price,
                }}
                onFinish={ async (values) => {
                    try {
                        const token = localStorage.getItem('token');
                        await axios.put(`http://localhost:3001/api/items/${editingItem.id}`, values, {
                            headers: {Authorization: `Bearer ${token}`}
                        });

                        setItems(items.map(item =>
                            item.id === editingItem.id ? { ...item, ...values } : item
                        ));
                        message.success('Successfully updated the item~!');
                        setIsModalVisible(false);
                    } catch (err) {
                        console.error('Error updating the item:', err);
                        message.error('Failed to update item.');
                    }
                }}
            >
                <Form.Item
                label = "Quantity"
                name = "quantity"
                rules = {[{ required: true, message: 'Please input quantity!'}]}>

                    <Input type="number" />
                </Form.Item>

                <Form.Item
                label = "Price"
                name = "price"
                rules = {[{ required: true, message: 'Please input price!'}]}>

                    <Input type="number" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit"> Save </Button>
                </Form.Item>

            </Form>

        </Modal>

      <Table 
        dataSource={items} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default DashboardPage;
