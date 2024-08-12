import fetcher from '@/app/lib/fetcher';

export default async function PostPage({ params }) {
  const { id } = params;
  const post = await fetcher(`/api/posts/${id}`);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
