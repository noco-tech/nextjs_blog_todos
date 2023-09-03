import Link from "next/link";
import { Layout } from "../components/Layout";
import { getAllPostsData } from "../lib/posts";
import { Post } from "../components/Post";

const BlogPage = ({ filteredPosts }) => {

  return (
    <Layout title="Blog page">
      <p className="text-4xl mb-10">Blog page</p>
      <ul>
        {filteredPosts &&
          filteredPosts.map((post) => <Post key={post.id} post={post} />)}
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
  );
};

export default BlogPage;

export async function getStaticProps() {
  const filteredPosts = await getAllPostsData();
  return {
    props: { filteredPosts },
    revalidate: 3,
  };
}
