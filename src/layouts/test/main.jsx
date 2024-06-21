import React from 'react';

import Header from './header'; // Đảm bảo import đúng đường dẫn đến component Header

const MainLayout = () => (
  <>
    <Header />
    <main>
      <h1>Main Content</h1>
      {/* Nội dung chính của trang */}
    </main>
  </>
);

export default MainLayout;