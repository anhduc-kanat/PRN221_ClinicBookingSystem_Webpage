import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'antd';
import axios from 'axios';
import { fDate } from 'src/utils/format-time';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TransactionStatus from 'src/enum/transaction-enum';
const apiRoot = import.meta.env.VITE_API_ROOT;

export default function PaymentHistoryPage() {
    const [payments, setPayments] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [open, setOpen] = useState(false);




    


    const token = localStorage.getItem("accessToken");

    const getStatusTransaction = (status) => {
        switch (status) {
            case 1:
                return <p className='text-green'>{TransactionStatus.DONE}</p>;
            case 2:
                return <p className='text-yellow'>{TransactionStatus.PENDING}</p>;
            case 3:
                return <p className='text-yellow'>{TransactionStatus.OVERDUE}</p>;
            default:
                return <p className='text-red'>{TransactionStatus.CANCELLED}</p>;
        }
    };

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
            title: 'Account Name',
            dataIndex: 'userAccountName',
        },
        {
            title: 'Pay Date',
            dataIndex: 'payDate',
            defaultSortDate: 'descend',
            sorter: (a, b) => new Date(a.payDate) - new Date(b.payDate)
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Service',
            dataIndex: 'serviceName',
            render: (text) => <div className="whitespace-pre-wrap">{text}</div>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (text, record) => (
                <span>{parseFloat(text).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</span>
              ),
        }
    ];

    const data = payments.map(payment => ({
        ...payment,
        payDate: fDate(payment.payDate),
        status: getStatusTransaction(payment.status),
        userAccountName: payment.appointment.userAccountName,
        serviceName: payment.appointment.appointment.map(service => service.serviceName).join('\n'),
        amount : payment.amount
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
