import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import {
  EventWrapper,
  FeaturedTag,
  ImageWrapper,
  Subtitle,
  Thumbnail,
  Details,
  Description,
  DetailsItem,
  DetailsName,
  DetailsSpec,
  DetailsWrapper,
  SoldOutText,
} from "../eventsStyles";

export default function Event({ event }) {
  const {
    event_images: eventImages,
    date,
    name,
    description,
    location,
    venue,
    lineup,
    ticket_types: ticketTypes,
    sold_out: soldOut,
    featured,
    sale_start_date: saleStartDate,
    sale_end_date: saleEndDate,
    spotify_tracks: spotify,
    apple_music_tracks: apple,
  } = event;

  const image = featured ? eventImages.landscape : eventImages.square;

  return (
    <EventWrapper>
      <ImageWrapper isFeatured={featured}>
        {featured && (
          <FeaturedTag>
            <Typography variant="subtitle2">FEATURED</Typography>
          </FeaturedTag>
        )}
        <Thumbnail isFeatured={featured} src={image} alt={name} />
      </ImageWrapper>
      <Typography variant="subtitle1">
        {moment(date).format("ddd DD MMM")} — {moment(date).format("LT")}
      </Typography>
      <Subtitle variant="h6">{name}</Subtitle>
      <Subtitle variant="subtitle1">{venue}</Subtitle>
      <Typography variant="subtitle1">
        {`${location.city}, ${location.country}`}
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<AddIcon />}>
          <Subtitle variant="body2">More Info</Subtitle>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Description variant="body2">{description}</Description>
            <DetailsWrapper>
              <Details variant="button">line up</Details>
            </DetailsWrapper>
            {lineup.map((l) => (
              <DetailsItem>
                <DetailsName variant="body2">{`${l.details}`}</DetailsName>
                {l.time && (
                  <DetailsSpec variant="body2">— {l.time}</DetailsSpec>
                )}
              </DetailsItem>
            ))}
            <DetailsWrapper>
              <Details variant="button">tickets</Details>
            </DetailsWrapper>
            {ticketTypes.map((ticket) => (
              <DetailsItem>
                <DetailsName variant="body2">{`${ticket.name}`}</DetailsName>
                <DetailsSpec variant="body2">
                  — £{ticket.price.total}
                </DetailsSpec>
                {ticket.sold_out && (
                  <SoldOutText variant="button">sold out</SoldOutText>
                )}
              </DetailsItem>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </EventWrapper>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    event_images: PropTypes.shape({
      landscape: PropTypes.string.isRequired,
      square: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    venue: PropTypes.string.isRequired,
    lineup: PropTypes.arrayOf(PropTypes.object).isRequired,
    ticket_types: PropTypes.arrayOf(PropTypes.object).isRequired,
    sold_out: PropTypes.bool.isRequired,
    featured: PropTypes.bool.isRequired,
    sale_start_date: PropTypes.string.isRequired,
    sale_end_date: PropTypes.string.isRequired,
    spotify_tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    apple_music_tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
