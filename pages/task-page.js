import Link from "next/link";
import { Layout } from "../components/Layout";
import { getAllTasksData } from "../lib/tasks";
import { Task } from "../components/Task";
import useSWR from "swr";
import { useEffect } from "react";

//useSWRを使う場合
const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage = ({ staticfilteredTasks }) => {
  //useSWRを使う場合
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilteredTasks,
  });
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    mutate();
  }, [])

  return (
    <>
      <Layout title="Task page">
        <p className="text-4xl mb-7">Task page</p>
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) => <Task key={task.id} task={task} />)}
        </ul>

        <Link href="/main-page">
          <div className="flex mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
            <span className="text-xl">Back to main page</span>
          </div>
        </Link>
      </Layout>
    </>
  );
};

export default TaskPage;

export async function getStaticProps() {
  const staticfilteredTasks = await getAllTasksData();

  return {
    props: { staticfilteredTasks },
    revalidate: 3,
  };
}
