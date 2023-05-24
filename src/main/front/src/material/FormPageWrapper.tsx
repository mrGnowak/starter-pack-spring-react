import { Container, Typography } from "@mui/material";

export type FormPageWrapperProps = React.PropsWithChildren<{
  title: string;
}>;

export function FormPageWrapper({ title, children }: FormPageWrapperProps) {
  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
}
