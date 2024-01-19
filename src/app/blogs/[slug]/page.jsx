import BlogContent from '@/components/BlogContent';
import steem from 'steem';

export default async function BlogPage({ params: { slug } }) {
  console.log(slug);
  try {
    const blog = await steem.api.getContentAsync('section-2', slug);
    return (
      <article className='rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4'>
        <BlogContent blog={blog} />
      </article>
    );
  } catch (error) {
    console.error('Error fetching blog content:', error);
    // Handle the error appropriately, e.g., show an error message to the user
    return <div>Error loading blog content</div>;
  }
}
