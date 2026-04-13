import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';
import { isAuthenticated } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/register', '/about'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    try {
      setFavouritesList(await getFavourites());
    } catch (err) {
      setFavouritesList([]);
    }
  }

  useEffect(() => {
    authCheck(router.pathname);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', path => authCheck(path));

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  async function authCheck(url) {
  const path = url.split('?')[0];
  if (!isAuthenticated()) {
    setAuthorized(false);
    if (!PUBLIC_PATHS.includes(path)) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  } else {
    await updateAtom();
    setAuthorized(true);
  }
}

  return authorized ? children : null;
}