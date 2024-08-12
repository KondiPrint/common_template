import fetcher from '@/app/lib/fetcher';
import JsonPosts from '@/components/JsonPlaceholder/GetPosts';

export default async function PostsPage() {
  // Fetch data from your internal API route
  const data = await fetcher('http://localhost:3000/api/jsonPholder/getPost');

  if (!data) {
    return <div>No posts available</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <JsonPosts data={data} />
    </div>
  );
}
