module.exports = {
    url: process.env.URL || 'http://localhost:8080',
    port: process.env.PORT || 8080,
    database: process.env.DATABASE_URL || 'mongodb://localhost:27017/our-wedding-heroes',
    secret: process.env.SECRET || 'ilovetheideaofmywedding',
    siteTitle: process.env.SITE_TITLE || 'Our Wedding',
    mail: {
        from: process.env.EMAIL_FROM,
        options: {
            service: process.env.EMAIL_SERVICE, // https://www.npmjs.com/package/nodemailer#using-well-known-services
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        },
    },
};
