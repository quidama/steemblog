import BlogContent from '@/components/BlogContent';
import BlogList from '@/components/BlogList';
import steem from 'steem';

export default async function BlogPage({ params: { slug } }) {
  console.log('Blogpage slug[0]:', slug[0]);
  console.log('Blogpage slug[1]:', slug[0]);
  if (slug.length === 1) {
    return (
      <section>
        <BlogList tag={slug[0]} />
      </section>
    );
  } else {
    try {
      const blog = await steem.api.getContentAsync(slug[0], slug[1]);
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
}
