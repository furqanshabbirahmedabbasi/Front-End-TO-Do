import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Global CSS
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS globally

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
