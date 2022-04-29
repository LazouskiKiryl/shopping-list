import { useEffect, useLayoutEffect, useRef } from 'react';

const useOutsideClick = (elementRef, handler, attached = true) => {
  const latestHandler = useRef(handler);

  useLayoutEffect(() => {
    latestHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!attached) return;

    const handleClick = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        latestHandler.current();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [elementRef, attached]);
};

export default useOutsideClick;
