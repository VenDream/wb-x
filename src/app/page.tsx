'use client';

/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { ROUTES } from '@/contants';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const toSettingsPage = () => {
    router.push(ROUTES.SETTINGS);
  };

  return (
    <div className="home p-4">
      <div className="hero rounded border-2 bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">You are at WB-X@1.0.0</p>
            <button className="btn btn-primary" onClick={toSettingsPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
