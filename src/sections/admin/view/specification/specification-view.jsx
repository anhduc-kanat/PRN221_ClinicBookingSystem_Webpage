import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Select, Row, Col, message } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Iconify from "src/components/iconify";

const { Option } = Select;

const apiRoot = import.meta.env.VITE_API_ROOT;

export default function SpecificationManagement() {
    const [specifications, setSpecifications] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedSpecification, setSelectedSpecification] = useState(null);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    useEffect(() => {
        fetchSpecifications();
        fetchServices();
    }, []);

    const fetchSpecifications = async () => {
        setLoading(true);
        await axios.get(`${apiRoot}/specification/get-all-specifications`)
            .then(response => {
                if (response.data.statusCode === 200) {
                    const specificationsWithServiceIds = response.data.data.map(spec => ({
                        ...spec,
                        businessServiceIds: spec.businessService.map(service => service.id)
                    }));
                    setSpecifications(specificationsWithServiceIds);
                    setPagination((prev) => ({
                        ...prev,
                        total: response.data.data.length,
                    }));
                    message.success(response.data.message);
                } else {
                    message.error(response.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            })

        setLoading(false);
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${apiRoot}/service/get-all-services`);
            setServices(response.data.data);
        } catch (error) {
            console.log("Error fetching services: ", error.message);
        }
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const handleCreateNewSpecification = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const specificationData = {
                ...values,
                businessServiceId: selectedServices,
            };
            await axios.post(`${apiRoot}/specification/create-specification`, specificationData)
                .then(response => {
                    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
                        fetchSpecifications();
                        message.success(response.data.message);
                    } else {
                        message.error(response.data.message);
                    }
                })
                .catch(err => {
                    console.log("Error at create specification: ", err.message);
                    message.error(err.response.data.error);
                });
            setIsModalVisible(false);
            form.resetFields();
            setSelectedServices([]);
        } catch (error) {
            console.log("Error creating specification: ", error.message);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedServices([]);
    };

    const handleEdit = (specification) => {
        setSelectedSpecification(specification);
        setSelectedServices(specification.businessServiceIds);
        editForm.setFieldsValue({
            name: specification.name,
            description: specification.description,
            businessServiceId: specification.businessServiceIds,
        });
        setIsEditModalVisible(true);
    };

    const handleDelete = (specification) => {
        setSelectedSpecification(specification);
        setIsDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${apiRoot}/specification/delete-specification/${selectedSpecification.id}`)
                .then(response => {
                    if (response.data.statusCode === 200) {
                        fetchSpecifications();
                        message.success(response.data.message);
                    } else {
                        message.error(response.data.message);
                    }
                })
                .catch(err => {
                    console.log("Error at Delete specification: ", err.message);
                    message.error(err.response.data.error);
                });
            const newSpecifications = specifications.filter(spec => spec.id !== selectedSpecification.id);
            const total = newSpecifications.length;
            const currentPage = pagination.current;
            const pageSize = pagination.pageSize;
            const newCurrent = (currentPage - 1) * pageSize >= total ? currentPage - 1 : currentPage;

            setSpecifications(newSpecifications);
            setPagination((prev) => ({
                ...prev,
                current: newCurrent,
                total: total,
            }));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.log("Error deleting specification: ", error.message);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleEditOk = async () => {
        try {
            const values = await editForm.validateFields();
            console.log(values);
            await axios.put(`${apiRoot}/specification/update-specification/${selectedSpecification.id}`, values)
                .then(response => {
                    if (response.data.statusCode === 200) {
                        message.success(response.data.message);
                    } else {
                        message.error(response.data.message);
                    }
                })
                .catch(err => {
                    console.log("Error at Update Specification: ", err.message);
                    message.error(err.response.data.error)
                });
            fetchSpecifications();
            setIsEditModalVisible(false);
            setSelectedSpecification(null);
            editForm.resetFields();
            setSelectedServices([]);
        } catch (error) {
            console.log("Error updating specification: ", error.message);
        }
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setSelectedSpecification(null);
        editForm.resetFields();
        setSelectedServices([]);
    };

    const handleServiceChange = (value) => {
        setSelectedServices(value);
    };

    const paginatedData = specifications.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="action-field">
                    <Button type="primary" onClick={() => handleEdit(record)}><AiFillEdit /></Button>
                    <Button type="primary" danger onClick={() => handleDelete(record)} style={{ marginLeft: '8px' }}><AiFillDelete /></Button>
                </div>
            ),
        },
    ];


    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Specification Management</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleCreateNewSpecification}>
                    New Specification
                </Button>
            </Stack>
            <Table
                dataSource={paginatedData}
                columns={columns}
                rowKey="id"
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
            <Modal
                title="Create New Specification"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input the name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input the description!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="businessServiceId"
                                label="Business Services"
                                rules={[{ required: true, message: 'Please select business services!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select business services"
                                    onChange={handleServiceChange}
                                >
                                    {services.map(service => (
                                        <Option key={service.id} value={service.id}>{service.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                title="Edit Specification"
                visible={isEditModalVisible}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                okText="Save"
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    name="edit_form_in_modal"
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input the name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input the description!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="businessServiceId"
                                label="Business Services"
                                rules={[{ required: true, message: 'Please select business services!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select business services"
                                    onChange={handleServiceChange}
                                    value={selectedServices} // Changed from defaultValue to value
                                >
                                    {services.map(service => (
                                        <Option key={service.id} value={service.id}>{service.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                title="Confirm Delete"
                visible={isDeleteModalVisible}
                onOk={confirmDelete}
                onCancel={handleCancelDelete}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this specification?</p>
                {selectedSpecification && (
                    <p>{`${selectedSpecification.name}`}</p>
                )}
            </Modal>
        </>
    );
};
