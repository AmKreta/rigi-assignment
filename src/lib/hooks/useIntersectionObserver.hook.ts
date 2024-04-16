import { useLayoutEffect, useRef} from 'react';

type IntersectionObserverOptions = IntersectionObserverInit & { freezeOnceVisible?: boolean };

function useIntersectionObserver(
  callback: (isVisible: boolean) => void,
  options: IntersectionObserverOptions = {}
) {
    const observer = useRef<IntersectionObserver | null>(null);
    const ref =   useRef();

    useLayoutEffect(() => {

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry=>{
                callback(entry.isIntersecting);
            });
        }, options);

        if (ref.current) {
            observer.current.observe(ref.current);
        }

        return () => {
            observer.current?.disconnect();
        };
    }, []);

    return ref;
}

export default useIntersectionObserver;
