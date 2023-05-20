import Footer, { FOOTER_HEIGHT } from "./Footer";
import Header from "./Header";
import Box from "@mui/material/Box";
//import { UserDto } from '@/lib/auth/user';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Box sx={{ minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)` }}>
        <header>
          <Header />
        </header>
        <main>
          <Box sx={{ position: "relative", padding: 0 }}>{children}</Box>
        </main>
      </Box>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
