const constants = require('./constants');

exports.generatePaypalMeLink = ({ username, amount = 0 }) => {
  let url = `${constants.BASE_URL}/${username}`;

  if (amount > 0) {
    url += `/${amount}`;
  }

  return url;
};
