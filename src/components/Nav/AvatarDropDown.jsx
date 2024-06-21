import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
};

const menu = (
  <Menu>
    <Menu.Item key="profile">
      <a href="/profile">Profile</a>
    </Menu.Item>
    <Menu.Item key="settings">
      <a href="/settings">Settings</a>
    </Menu.Item>
    <Menu.Item key="logout">
      <a onClick={logout}>Logout</a>
    </Menu.Item>
  </Menu>
);

const AvatarDropdown = () => {
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </Dropdown>
  );
};

export default AvatarDropdown;