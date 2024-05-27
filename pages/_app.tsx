import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'flowbite/dist/flowbite.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
