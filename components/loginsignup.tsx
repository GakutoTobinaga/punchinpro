"use client";

import { signIn } from "next-auth/react";
import LoadingDots from "./loading/loading-dots";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@tremor/react";
import { fetchUserId } from "@/lib/actions";
import { useEffect, useState } from "react";
import { fetchUserEmail,  } from "@/lib/actions";
import toast from "react-hot-toast";

export default function LoginSignin({ type }: { type: "login" | "register" }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getUserData = async () => {
      const userEmail = await fetchUserEmail();
      if (userEmail) {
        const fetchedUserId : number | null= await fetchUserId(userEmail);
        if (fetchedUserId) {
            setUserId(fetchedUserId);
        }
      }
    };
    getUserData();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            // Credentialsに通っているか
            if (error) {
              // そのあとのエラー
              console.log("login failed")
              toast.error("ログイン失敗")
              setLoading(false);
            } else {
              router.refresh();
              toast.success("ログイン成功")
              window.location.replace(`/`);
            }
          });
        } else {
          // typeがregisterで通ってるか
          console.log("type = register")
          fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname: e.currentTarget.firstname.value,
              lastname: e.currentTarget.lastname.value,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            console.log("Register passed")
            setLoading(false);
            if (res.status === 200) {
              setTimeout(() => {
                router.push("/login");
              }, 200);
            } else {
              const { error } = await res.json();
              console.log(error)
            }
          });
        }
      }}
      className="flex flex-col space-y-4 bg-blue-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="sample@email.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-blue-200 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {type === "register" ? (
          <div>
            <label
            htmlFor="password"
            className="block text-xs text-gray-600 uppercase"
            >
            氏名
            </label>
            <div className="Name flex">
              <input
              id="firstname"
              name="firstname"
              type="firstname"
              placeholder="firstname"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-blue-200 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
              <input
              id="lastname"
              name="lastname"
              type="lastname"
              placeholder="lastname"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-blue-200 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
          </div>
        ) : (<div></div>
        )}
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="your password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-blue-200 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <Button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "LOGIN" : "REGISTER"}</p>
        )}
      </Button>
      {type === "login" ? (
        <div className="text-center text-sm text-gray-600">
          アカウントを無料で{""}
          <Link href="/register" className="font-semibold text-gray-800">
            登録
          </Link>{""}
          できます。
        </div>
      ) : (
        <div className="text-center text-sm text-gray-600">
          アカウントをお持ちですか？{""}
          <Link href="/login" className="font-semibold text-gray-800">
            ログイン
          </Link>{""}
          できます。
        </div>
      )}
    </form>
  );
}
