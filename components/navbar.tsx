'use client';
import { usePathname } from 'next/navigation';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
// usernameがあるならusernameを表示して、取れていないならその場合の処理を考える。
export default function Navbar({ userFullname }: { userFullname : string | undefined}) {
    // username を取得し、navbarで誰がログインしているかを表示する。
    const pathname = usePathname();
    // replace this with component.
    let sample : string = "display Username here"
    if (userFullname) {
      sample = userFullname
    }
    const navigation = [
      { name: 'Attendance', href: '/' },
      { name: 'REGISTER', href: '/register' },
      { name: 'LOGIN', href: '/login' },
      { name: "MYPAGE", href: '/mypage' },
    ];
    return (
          <div className="shadow-sm bg-blue-100 border border-blue-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
                <div className='pt-5'>
                  {sample}
                </div>
              </div>
            </div>
          </div>
    );
  }
  