import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
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
            defaultSortDate: 'descend',
            sorter: (a, b) => new Date(a.payDate) - new Date(b.payDate)
        },
        {
            title: 'Status',
            dataIndex: 'transactionStatus',
        },
        {
            title: 'Service',
            dataIndex: 'serviceName',
            render: (text) => <div className="whitespace-pre-wrap">{text}</div>
        }
    ];

    const data = payments.map(payment => ({
        ...payment,
        payDate: fDate(payment.payDate),
        serviceName: payment.appointment.appointment.map(service => service.serviceName).join('\n')
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
