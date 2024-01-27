import LoginSignin from "@/components/loginsignup";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-blue-200 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-blue-100 px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            Punch in Pro
          </Link>
          <h3 className="text-xl font-semibold">REGISTER</h3>
          <p className="text-sm text-gray-500">
            メールアドレスと氏名でアカウントを作成
          </p>
        </div>
        <LoginSignin type="register" />
      </div>
    </div>
  );
}
