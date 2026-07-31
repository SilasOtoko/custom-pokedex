import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | Trainer Supply Co`;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
