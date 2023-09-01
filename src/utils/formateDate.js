import moment from "moment";

export const formatDate = (createAt) => {
  const date = moment(createAt);
  const formattedDate = date.format("DD MMM, YYYY");
  return formattedDate;
};
