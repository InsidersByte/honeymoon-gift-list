module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  port: process.env.PORT || 8080,
  secret: process.env.SECRET || 'ilovetheideaofmywedding',
  siteTitle: process.env.SITE_TITLE || 'Our Wedding',
  paypalMeUsername: process.env.PAYPAL_ME_USERNAME,
  mail: {
    from: process.env.EMAIL_FROM,
    signature: process.env.EMAIL_SIGNATURE,
    options: {
      service: process.env.EMAIL_SERVICE, // https://www.npmjs.com/package/nodemailer#using-well-known-services
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  },
};
