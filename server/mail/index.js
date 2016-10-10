const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const config = require('../config');

const templatesDirectory = path.join(__dirname, 'templates');

class mailer {
    constructor() {
        const options = (config.mail && Object.assign({}, config.mail.options)) || {};

        // if a service hasn't been set, send the mail directly
        if (!options.service) {
            options.direct = true;
        }

        this.transport = nodemailer.createTransport(options);
    }

    get from() {
        let from = config.mail && config.mail.from;

        // if no from has been set then default it
        if (!from) {
            from = `our-wedding-heroes@${this.getDomain()}`;
        }

        if (config.siteTitle) {
            from = `${config.siteTitle} <${from}>`;
        }

        return from;
    }

    getDomain() {
        const domain = config.url.match(new RegExp('^https?://([^/:?#]+)(?:[/:?#]|$)', 'i'));
        return domain && domain[1];
    }

    send(message, templateName) {
        const messageToSend = Object.assign(
            message,
            {
                from: this.from,
                signature: config.mail.signature,
            }
        );

        if (!templateName) {
            return this.sendMail(messageToSend);
        }

        const template = new EmailTemplate(path.join(templatesDirectory, templateName));

        return template
            .render(message)
            .then((result) => {
                messageToSend.text = result.text;
                messageToSend.html = result.html;

                return this.sendMail(message);
            });
    }

    sendMail(message) {
        return this.transport.sendMail(message);
    }
}

module.exports = mailer;
