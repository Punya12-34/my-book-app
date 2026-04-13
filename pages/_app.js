import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'jotai';
import MainNav from '@/components/MainNav';
import RouteGuard from '@/components/RouteGuard';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then(res => res.json()) }}>
      <Provider>
        <RouteGuard>
          <MainNav />
          <Component {...pageProps} />
        </RouteGuard>
      </Provider>
    </SWRConfig>
  );
}