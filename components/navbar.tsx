"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { House, Box, Settings } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      label: 'Dashboard',
      icon: House,
      href: '/dashboard',
      color: 'text-sky-500',
    },
    {
      label: 'Solve',
      icon: Box,
      href: '/dashboard/solve',
      color: 'text-violet-500',
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1 flex flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center pl-3 mb-14">
            <h1 className="text-2xl font-bold">Cube Solver</h1>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                  pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn('h-8 w-8 mr-3', route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
  
        {/* Setting Button at the bottom */}
        <div>
          <Link
            href="/dashboard/settings"
            className={cn(
              'text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
              pathname === '/dashboard/settings' ? 'text-white bg-white/10' : 'text-zinc-400'
            )}
          >
            <div className="flex items-center flex-1">
              <Settings className="h-8 w-8 mr-3 text-emerald-600" />
              Settings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
  
}