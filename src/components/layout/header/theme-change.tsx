'use client';

/*
 * Theme switcher
 *
 * @Author: VenDream
 * @Date: 2023-06-02 15:44:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import THEMES from './themes';

export default function ThemeChange() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="theme-change dropdown dropdown-end dropdown-bottom dropdown-hover">
      <label className="btn m-1">Themes</label>
      <ul className="menu dropdown-content rounded-box w-52 bg-base-100 p-2 shadow">
        {THEMES.map(theme => {
          return (
            <li
              key={theme.id}
              data-set-theme={theme.id}
              data-act-class="ACTIVECLASS"
            >
              <a>{theme.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
