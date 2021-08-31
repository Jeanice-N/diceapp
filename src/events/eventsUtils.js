import moment from "moment";

/**
 * Sort events by featured
 * @param {array} events
 */
export const sortEvents = (events) => {
  const featuredEvents = [];
  const nonFeaturedEvents = [];
  events.forEach((e) => {
    e.featured ? featuredEvents.push(e) : nonFeaturedEvents.push(e);
  });

  return featuredEvents.concat(nonFeaturedEvents);
};

/**
 * Finds if event is currently on sale
 * @param {string} startDate
 * @param {string} endDate
 * @returns bool
 */
export const isOnSaleNow = (startDate, endDate) => {
  const dateNow = new Date();

  const hasSaleStarted = moment(dateNow).isSameOrAfter(startDate);
  const hasSaleEnded = moment(endDate).isSameOrBefore(dateNow);

  return hasSaleStarted && !hasSaleEnded;
};

/**
 * Gets text for event button
 * @param {string} startDate
 * @param {string} endDate
 * @param {bool} isSoldOut
 * @returns string
 */
export const getButtonText = (startDate, endDate, isSoldOut) => {
  const isOnSale = isOnSaleNow(startDate, endDate);

  if (isSoldOut) {
    return "sold out";
  }
  if (isOnSale) {
    return "book now";
  }
  return "get reminded";
};

/**
 * Gets min priced ticket
 * @param {array} ticketTypes
 * @returns number | undefined
 */
export const getMinPrice = (ticketTypes) => {
  const test = ticketTypes.sort((x, y) => x.price.total - y.price.total);

  return test[0]?.price?.total;
};

/**
 * Gets audio preview url
 * @param {array} spotify
 * @param {array} apple
 * @returns string | undefined
 */
export const getAudioUrl = (spotify, apple) => {
  const audio =
    spotify.filter((s) => s.preview_url) || apple.filter((a) => a.preview_url);

  return audio[0]?.preview_url;
};
