import "../styles/globals.css";
import { SampleContextProvider } from "../store/sample-context";

function MyApp({ Component, pageProps }) {
  return (
    <SampleContextProvider>
      <Component {...pageProps} />
    </SampleContextProvider>
  );
}

export default MyApp;
