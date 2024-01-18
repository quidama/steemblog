export default function BlogCard({
  blog: { title, category, created, body, author, json_metadata },
}) {
  return (
    <article className='flex max-w-xl flex-col items-start justify-between'>
      <div className='flex items-center gap-x-4 text-xs'>
        <p className='text-gray-500'>
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(Date.parse(created))}
        </p>
        <p className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
          {category}
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
          <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
            <span className='absolute inset-0' />
            {title}
          </h3>
        </div>

        <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
          {body.substring(0, 200)}
        </p>
      </div>
      <div className='relative mt-8 flex items-center gap-x-4'>
        <div className='text-sm leading-6'>
          <p className='font-semibold text-gray-900'>
            <span className='absolute inset-0' />
            {author}
          </p>
        </div>
      </div>
    </article>
  );
}
