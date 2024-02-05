'use client';
import { usePathname } from 'next/navigation';
import { getUserIdByEmail } from '@/lib/actions';
import { getUserEmailFromSession } from '@/lib/actions';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@tremor/react';
import toast from 'react-hot-toast';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({
  userFullname,
}: {
  userFullname: string | undefined;
}) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    setIsLogin(false);
    setTimeout(() => {
      toast.success('Logout successful');
      window.location.replace('/login');
    }, 1000);
  };
  useEffect(() => {
    const getUserData = async () => {
      const userEmail = await getUserEmailFromSession();
      if (userEmail) {
        const fetchedUserId = await getUserIdByEmail(userEmail);
        setUserId(fetchedUserId);
        setIsLogin(true);
        if (userEmail === 'admin@mail.com') {
          setIsAdmin(true);
        }
      }
    };
    getUserData();
  }, []);

  const displayName = userFullname ? userFullname : '';

  const navigation = [
    { name: 'Attendance', href: '/' },
    { name: 'REGISTER', href: '/register' },
    { name: 'LOGIN', href: '/login' },
    ...(isAdmin ? [{ name: 'ADMIN', href: `/admin` }] : []),
    ...(!isAdmin && userId
      ? [{ name: 'MYPAGE', href: `/mypage/${userId}` }]
      : []),
  ];
  return (
    <div className="shadow-sm bg-blue-100 border border-blue-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'border-blue-800 text-blue-800'
                      : 'border-transparent text-gray-400 hover:text-blue-700 hover:border-blue-300',
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="pt-5 pr-5">{displayName}</div>
            <div className="pt-3">
              {isLogin ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Button>
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
