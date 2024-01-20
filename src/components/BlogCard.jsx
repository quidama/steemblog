export default function BlogCard({
  blog: { title, created, body, author, json_metadata },
  sectionTitle,
}) {
  return (
    <article className='flex max-w-xl flex-col items-start justify-between overflow-hidden'>
      <div className='flex flex-row justify-between items-center text-xs'>
        <p className='text-gray-500 flex-grow'>
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(Date.parse(created))}
        </p>
        <p className=' object-fill rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600'>
          {author}
        </p>
      </div>
      <div className='group relative'>
        {/* {JSON.parse(json_metadata).image && (
              <img
                src={JSON.parse(json_metadata).image[0]}
                alt='Post'
                className='h-10 w-10 rounded-full bg-gray-50'
              />
            )} */}
        <div>
          <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 '>
            <span className='absolute inset-0' />
            {title}
          </h3>
        </div>

        <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
          {body.substring(0, 200)}
        </p>
      </div>
    </article>
  );
}
