/*
 * Layout menu
 *
 * @Author: VenDream
 * @Date: 2023-06-09 11:14:10
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import './menu.sass';

export default function Menu() {
  return (
    <aside className="h-full">
      <div className="logo px-4 py-2">
        <a className="btn-ghost btn text-xl normal-case">WB-X</a>
      </div>
      <div className="menu">
        <ul className="layout-menu menu w-60 p-4 text-base-content">
          <li>
            <a>Menu1</a>
          </li>
          <li>
            <a>Menu2</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
