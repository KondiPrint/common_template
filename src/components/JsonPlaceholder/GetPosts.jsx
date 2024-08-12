import Link from 'next/link';

export default function JsonPosts({ data }) {
  return (
    <div className='space-y-4 p-4'>
      {data.map((post) => (
        <div className='card bg-base-100 w-fit shadow-xl ' key={post.id}>
          <div className='badge badge-primary rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-2xl p-3'>
            {post.id}
          </div>
          <div className='card-body'>
            <h2 className='card-title'>{post.title}</h2>
            <p>{post.body}</p>
            <div className='card-actions justify-end'>
              <Link href={`/jsonPlaceholder/posts/${post.id}`} className='btn btn-primary'>
                Read more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
