'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import 'intersection-observer';
import getDiscussionsByBlog from '@/lib/getDiscussionByBlog';
import BlogCard from './BlogCard';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const lastAuthor = useRef('');
  const lastPermlink = useRef('');
  const oldPermlink = useRef('');
  const showMore = useRef(true);
  const targetRef = useRef(null);
  const blogStart = useRef(false);

  let i = 0;
  const handleIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        console.log('excute : ', (i += 1));
        loadMoreBlogs();
      }
    },
    [blogs]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.9,
      root: null,
    });
    const target = document.querySelector('.load-more-trigger');

    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  const loadMoreBlogs = async () => {
    try {
      getDiscussionsByBlog({
        tag: 'section-2',
        start_author: lastAuthor.current,
        start_permlink: lastPermlink.current,
        limit: 5,
      }).then((result) => {
        const extendLastBlog = result[result.length - 1];
        console.log(extendLastBlog.permlink);
        if (result.length > 1) {
          const resultFirstBlog = result.shift();
          if (oldPermlink.current !== extendLastBlog.permlink) {
            setBlogs((prev) => [...prev, ...result]);
            const lastBlog = result[result.length - 1];
            const { author, permlink } = lastBlog;
            lastAuthor.current = author;
            lastPermlink.current = permlink;
            showMore.current = true;
            console.log('showMore.current-final:', showMore.current);
            oldPermlink.current = permlink;
          } else {
            showMore.current = false;
            console.log('showMore.current-final:', showMore.current);
          }
        } else {
          alert('더이상의 Blog가 없습니다.');
        }
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const initialfetchBlogs = async () => {
    try {
      blogStart.current = true;
      setLoading(true);
      getDiscussionsByBlog({
        tag: 'section-2',
        limit: 5,
      }).then((result) => {
        setBlogs(result);
        const lastBlog = result[result.length - 1];
        const { author, permlink } = lastBlog;

        lastAuthor.current = author;
        lastPermlink.current = permlink;
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
      blogStart.current = false;
    }
  };

  useEffect(() => {
    initialfetchBlogs();
  }, []);

  return (
    <section>
      <div>
        <div className='bg-white py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                지역문제
              </h2>
              <p className='mt-2 text-lg leading-8 text-gray-600'>
                지역문제 제목 분류에 대한 설명 추가
              </p>
            </div>
            <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
              {blogs?.map((blog) => (
                <Link key={blog.post_id} href={`/blogs/${blog.permlink}`}>
                  <BlogCard blog={blog} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {!loading && (
          <p className='load-more-trigger' ref={targetRef}>
            {blogStart.current ? null : 'continue...'}
          </p>
        )}
      </div>
    </section>
  );
}
