import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> <h1>SPLENDR</h1>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/clients">
            <BsGrid1X2Fill className='icon' /> Clients
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/services">
            <BsFillArchiveFill className='icon' /> Services
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/beauticians">
            <BsFillGrid3X3GapFill className='icon' /> Beauticians
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
