import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//import { getUserFromSession, UserDto } from '@/lib/auth/user';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { FOOTER_HEIGHT } from "../components/Footer";

//type Props = {
//  user: UserDto | null;
//};

const scrollDown = () => {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
};

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          minHeight: `calc(100vh - ${FOOTER_HEIGHT}px + 8px)`, //this 8px is due to the different height of footer for mobile and PC ver.
          textAlign: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE1fHxza3l8ZW58MHx8fHwxNjI3OTY0MDY1&ixlib=rb-1.2.1&q=80&w=2000')",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            width="60%"
            variant="h3"
            component="h1"
            color="white"
            gutterBottom
          >
            Welcome on our website!
          </Typography>
        </Box>
        <Typography width="40%" variant="subtitle1" color="white" gutterBottom>
          Est fugiat dolor cupidatat nisi ipsum commodo commodo eu ad. Et
          proident duis laboris sint excepteur.
        </Typography>
        <Button
          size="large"
          sx={{
            justifySelf: "flex-end",
            color: " white",
            fontSize: "2rem",
            borderRadius: "50px",
          }}
          onClick={() => scrollDown()}
        >
          Learn more
        </Button>
      </Box>
      <Box sx={{ maxWidth: "30%", margin: "auto" }}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: `calc(150vh - ${FOOTER_HEIGHT}px) `,
        }}
      >
        <Typography>CONTENT</Typography>
      </Box>
    </>
  );
}

//export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
//  const user = await getUserFromSession(req);
//  return {
//    props: { user: user ?? null },
//  };
//};

//<style jsx>{`
//li {
//  margin-bottom: 0.5rem;
//}
//pre {
//  white-space: pre-wrap;
//  word-wrap: break-word;
//}
//`}</style>
