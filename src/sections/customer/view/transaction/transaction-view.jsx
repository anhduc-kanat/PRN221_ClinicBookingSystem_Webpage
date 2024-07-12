import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button, Alert, Modal, Form, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { fDate } from 'src/utils/format-time';
const apiRoot = import.meta.env.VITE_API_ROOT;

export default function PaymentHistoryPage() {
    const [payments, setPayments] = useState([]);

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        const p = JSON.parse(localStorage.getItem("profile"));

        axios.get(`${apiRoot}/transaction/get-transaction-user/${p.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.statusCode === 200) {
                    setPayments(response.data.data);
                } else {
                    console.error('Failed to fetch services:', response.data.message);
                }
            }).catch(error => console.error('Error fetching services:', error));
    };

    

    const columns = [
        {
            title: 'Bank Code',
            dataIndex: 'bankCode',
        },
        {
            title: 'Bank Transaction Number',
            dataIndex: 'bankTranNo',
        },
        {
            title: 'Card Type',
            dataIndex: 'cardType',
        },
        {
            title: 'Pay Date',
            dataIndex: 'payDate',
        },
        {
            title: 'Status',
            dataIndex: 'transactionStatus',
        },
        {
            title: 'Service',
            dataIndex: 'serviceName',
        }
    ];

    const data =payments.map(payment => ({
        ...payment,
        payDate: fDate(payment.payDate)
    }));
    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </>
    );
}
