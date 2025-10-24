import React, { useState, useEffect } from 'react';
import { Input, Table, Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

const SearchablePayees = () => {
  const [payees, setPayees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayees();
  }, []);

  const fetchPayees = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payees');
      const data = await response.json();
      setPayees(data);
    } catch (error) {
      console.error('Error fetching payees:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Account Number', 
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Bank',
      dataIndex: 'bank', 
      key: 'bank',
      sorter: (a, b) => a.bank.localeCompare(b.bank),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/cards/payees/edit/${record.id}`}>
            <Button type="primary" size="small">Edit</Button>
          </Link>
          <Button danger size="small" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const filteredPayees = payees.filter(payee => {
    if (!searchTerm) return true;
    const searchableString = `${payee.name || ''} ${payee.accountNumber || ''} ${payee.bank || ''} ${payee.email || ''}`.toLowerCase();
    return searchableString.includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id) => {
    console.log('Delete payee with id:', id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Enhanced Payees Management</h1>
        <Link to="/cards/payees/add">
          <Button type="primary" size="large">Add New Payee</Button>
        </Link>
      </div>
      
      <div className="mb-4">
        <Search
          placeholder="Search payees by name, account, bank, or email..."
          allowClear
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-lg"
        />
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600">
            Found {filteredPayees.length} of {payees.length} payees
          </div>
        )}
      </div>

      <Table
        columns={columns}
        dataSource={filteredPayees}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payees`,
        }}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default SearchablePayees;