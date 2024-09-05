import { useEffect, useRef } from 'react';

export const useLazyLoad = (callback, loading) => {
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          callback();
        }
      },
      { threshold: 1.0 } 
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback, loading]);

  return observerRef;
};
