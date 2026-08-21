import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Modal, Form, Input, Button, Table, Space, message } from 'antd';
import axios from 'axios';
import Welcome from './welcome';
import { SearchOutlined, PlusCircleOutlined, EditOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import '../styles/dashboard.css'

const DashboardPage = () => {
  const username = localStorage.getItem('username');
  const [items, setItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

    useEffect(() => {
    fetchItems();

    const interval = setInterval(fetchItems, 2000); // refresh every 2s
    return () => clearInterval(interval); // cleanup
  }, []);

  const handleAddItem = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/items', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Item added!');
      fetchItems();
      setActiveModal(null);
    } catch (err) {
      message.error('Failed to add item');
    }
  };


  const handleDeleteItem = async (id) => {
    Modal.confirm({
        title: 'Are you sure you want to remove this item?',
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
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
        }
    })
  };


  const viewColumns = [
    { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (p) => `₱${p}` },
  ];

  const updateColumns = [
    ...viewColumns,
    {
  title: 'Actions',
  key: 'actions',
  render: (_, record) => (
    <Space>
      <Button 
        type="primary" 
        onClick={() => {
          setEditingItem(record);
          setIsEditModalVisible(true);
        }}
      >
        Edit
      </Button>
      <Button danger onClick={() => handleDeleteItem(record.id)}>Delete</Button>
    </Space>
  ),
},

  ];

const exportToCSV = (data) => {
  const headers = ["Item Name", "Quantity", "Price"];
  const rows = data.map(item => [item.itemName, item.quantity, item.price]);

  let csvContent = "data:text/csv;charset=utf-8," 
    + [headers, ...rows].map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "inventory_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportToPDF = (data) => {
  import("jspdf").then(jsPDF => {
    const doc = new jsPDF.default();
    doc.text("Inventory Report", 10, 10);
    data.forEach((item, index) => {
      doc.text(`${item.itemName} - Qty: ${item.quantity} - ₱${item.price}`, 10, 20 + index * 10);
    });
    doc.save("inventory_report.pdf");
  });
};


  return (
    <div style={{ padding: 20 }}>
      <Welcome username={username} />

    <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
            <Card className="summaryCard totalCard" title="Available Stocks" bordered={false}>
            <h2>{items.reduce((total, item) => total + item.quantity, 0)}</h2>
            </Card>
        </Col>
        <Col span={8}>
            <Card className="summaryCard lowStockCard" title="Low Stock (<5)" bordered={false}>
            <h2>{items.filter(i => i.quantity < 5).length}</h2>
            </Card>
        </Col>
        <Col span={8}>
            <Card className="summaryCard outStockCard" title="Out of Stock" bordered={false}>
            <h2>{items.filter(i => i.quantity === 0).length}</h2>
            </Card>
        </Col>
    </Row>


      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card className="crudCard addCard" title={<span><PlusCircleOutlined style={{ marginRight: 8 }}/>Add Item</span>} hoverable onClick={() => setActiveModal('add')}>
             Quickly add new stock to your inventory.
          </Card>
        </Col>
        <Col span={8}>
          <Card className="crudCard checkCard" title= {<span><SearchOutlined style={{ marginRight: 8 }}/> Check Stocks </span>} hoverable onClick={() => { fetchItems(); setActiveModal('stocks'); }}>
            View current inventory levels.
          </Card>
        </Col>
        <Col span={8}>
          <Card className="crudCard editCard" title={<span><EditOutlined style={{ marginRight: 8 }}/>Update Item</span>} hoverable onClick={() => { fetchItems(); setActiveModal('update'); }}>
            Edit or delete existing stock.
          </Card>
        </Col>
      </Row>

        <Row gutter={16}>
            <Col span={8}>
        <Card
            className="reportsCard"
            title={<span><CloudDownloadOutlined style={{ marginRight: 8 }}/>Generate Reports</span>} 
            hoverable 
            onClick={() => setActiveModal('reports')}
        >
            Generate and export inventory reports.
        </Card>
        </Col>
        </Row>
        

        <Modal
            title="Reports"
            open={activeModal === 'reports'}
            onCancel={() => setActiveModal(null)}
            footer={null}
            >
            <Button type="primary" onClick={() => exportToCSV(items)}>Export CSV</Button>
            <Button style={{ marginLeft: 8 }} onClick={() => exportToPDF(items)}>Export PDF</Button>
        </Modal>

      <Modal
        title="Add Item"
        open={activeModal === 'add'}
        onCancel={() => setActiveModal(null)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddItem}>
          <Form.Item label="Item Name" name="itemName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">Add</Button>
        </Form>
      </Modal>

      {/* Stocks Modal (no actions) */}
      <Modal
        title="Available Stocks"
        open={activeModal === 'stocks'}
        onCancel={() => setActiveModal(null)}
        footer={null}
        width={800}
      >
        <Table dataSource={items} columns={viewColumns} rowKey="id" pagination={{ pageSize: 5 }} />
      </Modal>

      {/* Update Item Modal (with actions) */}
      <Modal
        title="Update Item"
        open={activeModal === 'update'}
        onCancel={() => setActiveModal(null)}
        footer={null}
        width={800}
      >
        <Table dataSource={items} columns={updateColumns} rowKey="id" pagination={{ pageSize: 5 }} />
      </Modal>

      <Modal
        title={`Edit Item: ${editingItem?.itemName}`}
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        >
  <Form
    layout="vertical"
    initialValues={{
      quantity: editingItem?.quantity,
      price: editingItem?.price,
    }}
    onFinish={async (values) => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/api/items/${editingItem.id}`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Item updated successfully!');
        fetchItems(); // refresh table
        setIsEditModalVisible(false);
      } catch (err) {
        console.error('Error updating item:', err);
        message.error('Failed to update item');
      }
    }}
  >
    <Form.Item
      label="Quantity"
      name="quantity"
      rules={[{ required: true, message: 'Please input quantity!' }]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
      rules={[{ required: true, message: 'Please input price!' }]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export default DashboardPage;
