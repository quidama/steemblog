import MarkDownViewer from '@/components/MarkDownViewer';
import { AiTwotoneCalendar } from 'react-icons/ai';

export default function BlogContent({
  blog: { title, category, created, body, author, json_metadata },
}) {
  return (
    <section className='flex flex-col p-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='flex items-center self-end text-sky-600'>
        <AiTwotoneCalendar />
        <p className='font-semibold ml-2'>
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(Date.parse(created))}
        </p>
      </div>
      <h1 className='text-4xl font-bold pb-4'>
        {title.replace(/^[^ ]* /, '')}
      </h1>
      <p className='text-xl font-bold'>{author}</p>
      <div className='w-44 border-2 border-sky-600 mt-4 mb-8' />
      <MarkDownViewer content={body} />
    </section>
  );
}
