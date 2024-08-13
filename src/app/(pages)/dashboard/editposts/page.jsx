import fetchData from '@/app/lib/fetchData';
import JsonDeletePost from '@/components/JsonPlaceholder/DeletePost';
import { TbEdit } from 'react-icons/tb';

export default async function EditPosts() {
  // Fetch data using the universal fetcher
  const { data, error } = await fetchData('https://jsonplaceholder.typicode.com/posts/');

  if (error) {
    // Handle the error appropriately
    return <div>Error: {error}</div>;
  }
  const truncate = (text, i) => (text?.length > 30 ? `${text.substring(0, 90)}...` : text);
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {data &&
          data.map((posts, index) => (
            <div key={posts.id} className='card bg-base-100 w-full shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title'>{posts.id}</h2>
                <p>{truncate(posts.title)}</p>

                <div className='card-actions justify-between'>
                  <JsonDeletePost postId={posts.id} />
                  <button className='btn btn-small btn-ghost'>
                    <TbEdit className='text-green-800 size-8' />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
