import { useEffect } from 'react';

export function usePageTitle(page: string) {
  useEffect(() => {
    document.title = `AniAMC | ${page}`;
    return () => { document.title = 'AniAMC'; };
  }, [page]);
}
