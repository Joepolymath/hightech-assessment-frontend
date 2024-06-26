import { useState } from 'react';
import { ISideBarItem } from '../@types/data.types';
import { sidebarMenu } from '../data/sidebarItems';

const SideNav = () => {
  const [navItems] = useState<ISideBarItem[]>(sidebarMenu);

  return (
    <nav className="w-3/12 h-full bg-dark-600 flex flex-col items-center">
      <div className="flex items-center my-14">
        <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
        <span className="font-semibold text-light-100 ml-4">HighTech</span>
      </div>
      <ul>
        {navItems.map((navItem, index) => (
          <li
            key={navItem.id}
            className={`cursor-pointer ${
              navItem.isActive ? 'flex items-center relative py-1' : ''
            } ${index > 0 ? 'my-6' : 'mb-4'}`}
          >
            {navItem.isActive ? (
              <div className="w-10 h-[2px] bg-light-200 mr-2 absolute -left-12"></div>
            ) : null}
            <span className="text-light-200 text-xs">{navItem.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
