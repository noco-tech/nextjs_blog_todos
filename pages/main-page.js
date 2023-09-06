import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { Layout } from "../components/Layout";
import Link from "next/link";

const cookie = new Cookie();

const MainPage = () => {
  const router = useRouter();

  const logout = () => {
    //cookie.remove("access_token"); //pathを指定しないと削除できない場合がある
    cookie.remove("access_token", { path: "/" });
    router.push("/");
  };

  return (
    <Layout title="Main page">
      <div className="flex items-center justify-center mx-5">
        <Link href="/blog-page">
          <a className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded">
            <span className="text-bold text-yellow-400">Blog</span> by SSG
            + ISR
          </a>
        </Link>

        <Link href="/task-page">
          <a className="bg-yellow-400 ml-8 hover:bg-yellow-500 text-white px-4 py-12 rounded">
            <span className="text-bold text-indigo-700">Task</span> by ISR
            + CSR
          </a>
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mt-10 cursor-pointer w-6 h-6"
        onClick={logout}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      </svg>
    </Layout>
  );
};

export default MainPage;
