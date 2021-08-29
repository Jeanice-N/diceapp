import React from "react";
import {
  Button,
  Container,
  createTheme,
  TextField,
  Typography,
} from "@material-ui/core";
import styled, { css } from "styled-components";

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

export const EventsRow = styled(Container)`
  && {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
  }
`;

export const EventWrapper = styled.div`
  width: 250px;
`;

export const ImageWrapper = styled(({ isFeatured, ...p }) => <div {...p} />)(
  (p) => css`
    position: relative;
    width: 250px;
    height: ${p.isFeatured ? theme.spacing(18) : theme.spacing(31)}px;
  `
);

export const Thumbnail = styled(({ isFeatured, ...p }) => (
  <img {...p} alt="thumbnail" />
))(
  (p) => css`
    width: 250px;
    height: ${p.isFeatured ? theme.spacing(18) : theme.spacing(31)}px;
  `
);

export const FeaturedTag = styled.div`
  float: right;
  position: absolute;
  right: ${theme.spacing()}px;
  bottom: ${theme.spacing()}px;
  background-color: ${theme.palette.primary.main};
  padding: ${theme.spacing(0.5)}px;
  color: ${theme.palette.common.white};
  letter-spacing: 0.15em;
`;

export const Subtitle = styled(Typography)`
  && {
    font-weight: bold;
  }
`;

export const Description = styled(Typography)`
  && {
    padding-bottom: ${theme.spacing(2)}px;
  }
`;

export const DetailsWrapper = styled.div`
   {
    padding: ${theme.spacing(2, 0, 2, 0)};
  }
`;

export const Details = styled(Typography)`
  && {
    font-weight: bold;
    color: ${theme.palette.primary.main};
  }
`;

export const DetailsItem = styled.div`
   {
    display: flex;
  }
`;

export const DetailsName = styled(Typography)`
  && {
    padding: ${theme.spacing(0.25, 0, 0.25, 0)};
  }
`;

export const DetailsSpec = styled(Typography)`
  && {
    padding: ${theme.spacing(0.25, 0, 0.25, 0.5)};
    font-weight: bold;
  }
`;

export const SoldOutText = styled(DetailsSpec)`
  && {
    padding: ${theme.spacing(0.25, 0, 0.25, 0.5)};
    font-weight: bold;
    color: ${theme.palette.grey[700]};
  }
`;
