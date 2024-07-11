import React from 'react';
import { Table, Popconfirm, Button } from 'antd';
export default function DentistPage() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Update',
            dataIndex: 'update',
            render: (text, record) => (
                <Button type="primary" onClick={() => console.log(`Update record with key: ${record.key}`)}>Update</Button>
              ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (text, record) => (
                <Popconfirm
                  title="Are you sure you want to delete this record?"
                  onConfirm={() => handleDelete(record.key)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              ),
        }
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>

            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
        </>
    )
}