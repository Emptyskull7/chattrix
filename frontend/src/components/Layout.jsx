import Navbar from './Navbar'
import Sidebar from './Sidebar'
import React from 'react'

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
