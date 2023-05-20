import * as React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";

import "./global.css";
import createEmotionCache from "../material/createEmotionalCache";
import Layout from "../components/Layout";
import { CurrentThemeProvider } from "../material/CurrentThemeProvider";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <CurrentThemeProvider>
        <Layout />
      </CurrentThemeProvider>
    </CacheProvider>
  );
}
