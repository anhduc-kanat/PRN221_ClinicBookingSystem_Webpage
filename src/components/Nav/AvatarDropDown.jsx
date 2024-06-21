import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AvatarDropdown = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role"); // Clear role from localStorage if you are storing it
    window.location.href = "/login";
  };

  const handleNavigate = () => {
    const role = localStorage.getItem("role");
    if (role === "CUSTOMER") {
      navigate('/customer');
    } else if (role === "DENTIST") {
      navigate('/dentist');
    } else if (role === "STAFF") {
      navigate('/staff');
    } else if (role === "ADMIN") {
      navigate('/admin');
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <a onClick={handleNavigate}>Profile</a>
      </Menu.Item>
      <Menu.Item key="settings">
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={logout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </Dropdown>
  );
};

export default AvatarDropdown;
