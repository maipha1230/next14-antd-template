'use client'
import { Button } from "antd";
import { deleteCookie } from "./utils/cookie";
import { showEnsureAlert } from "./utils/sweetalert";

export default function Home() {
  const onLogoutClick = async () => {
    let alert = await showEnsureAlert('are you want to logout ?')
    if (alert.isConfirmed) {
      deleteCookie('access_token')
      window.location.href = '/login'
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      SIGN IN SUCCESS
      <Button type="default" className="bg-red-400 text-white border-none outline-none hover:bg-red-600" onClick={onLogoutClick}>
        Logout
      </Button>
    </main>
  );
}
