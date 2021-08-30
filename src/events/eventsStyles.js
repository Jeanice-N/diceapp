import React from "react";
import {
  Accordion,
  Button,
  Container,
  createTheme,
  IconButton,
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
    padding: ${theme.spacing(3, 0, 3, 0)};
  }
`;

export const EventsRow = styled(Container)`
  && {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: ${theme.spacing(2)}px;
  }
`;

export const EventWrapper = styled.div`
  width: ${theme.spacing(31)}px;
  padding-bottom: ${theme.spacing(5)}px;
`;

export const ImageWrapper = styled(({ isFeatured, ...p }) => <div {...p} />)(
  (p) => css`
    position: relative;
    width: ${theme.spacing(31)}px;
    height: ${p.isFeatured ? theme.spacing(18) : theme.spacing(31)}px;
  `
);

export const Thumbnail = styled(({ isFeatured, ...p }) => (
  <img {...p} alt="thumbnail" />
))(
  (p) => css`
    width: ${theme.spacing(31)}px;
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

export const SaleTag = styled.div`
  float: right;
  position: absolute;
  right: ${theme.spacing()}px;
  bottom: ${theme.spacing()}px;
  background-color: ${theme.palette.common.black};
  padding: ${theme.spacing(0.5)}px;
  color: ${theme.palette.common.white};
`;

export const Play = styled.div`
  float: left;
  position: absolute;
  left: 0px;
  bottom: 0px;
  background-color: ${theme.palette.grey[800]};
  opacity: 70%;
`;

export const PlayButton = styled(IconButton)`
  && {
    color: ${theme.palette.common.white};
  }
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

export const LocationText = styled(Typography)`
  && {
    padding-bottom: ${theme.spacing(2)}px;
  }
`;

export const AccordionStyled = styled(Accordion)`
  && {
    background-color: ${theme.palette.grey[200]};
  }
`;

export const PriceWrapper = styled.div`
   {
    display: flex;
    padding-top: ${theme.spacing(2)}px;
    justify-content: space-between;
  }
`;

export const ButtonStyled = styled(({ ...p }) => <Button {...p} />)(
  (p) => css`
    &&& {
      font-weight: bold;
      color: ${p.disabled
        ? theme.palette.common.black
        : theme.palette.common.white};
    }
  `
);

export const FromText = styled(Typography)`
  && {
    color: ${theme.palette.grey[600]};
  }
`;

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
