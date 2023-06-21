import React, { Component } from "react";
import { Button, Container } from "@mui/material";
import { enqueueSnackbar } from "notistack";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
    enqueueSnackbar({
      message: error.message,
      variant: "error",
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container fixed>
          <h2>Oops, there is an error!</h2>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
