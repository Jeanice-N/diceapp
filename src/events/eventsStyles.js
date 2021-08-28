import {
  Button,
  Container,
  createTheme,
  TextField,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";

const theme = createTheme();

export const Wrapper = styled(Container)`
  padding-top: ${theme.spacing(3)}px;
`;

export const Form = styled.form`
  display: flex;
`;

export const SearchField = styled(TextField)`
  && {
    padding-right: ${theme.spacing(5)}px;
  }
`;

export const SearchButton = styled(Button)`
  && {
    border-radius: ${theme.shape.borderRadius * 4}px;
  }
`;

export const Header = styled(Typography)`
  && {
    padding-top: ${theme.spacing(2)}px;
  }
`;
