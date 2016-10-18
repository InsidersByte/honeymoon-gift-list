const wedding_profile_id = 1; // eslint-disable-line camelcase

function createSection(knex, { title, position, content }) {
    return {
        title,
        content,
        position: position * 1000000,
        wedding_profile_id,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    };
}

exports.seed = knex =>
    knex('wedding_profiles').count('id')
        .then(([{ count: countString }]) => {
            // FIXME: Hack as count returns a string for some reason
            const count = parseInt(countString, 10);

            if (count >= 1) {
                console.log('Initial seed already run');
                return Promise.resolve();
            }

            console.log('Running initial seed file');

            return knex.transaction(transaction =>
                knex('wedding_profiles').transacting(transaction).insert({
                    id: wedding_profile_id,
                    cover_title: 'Our Wedding',
                    cover_image_url: 'http://www.giveasyoulive.com/blog/wp-content/uploads/2016/07/fpt-112704-Wedding-Flowers.jpg',
                    wedding_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    gift_list_content: 'In this section you can describe the motivation behind your gift list. You could also link to any other gift lifts you have in here too.', // eslint-disable-line max-len
                    show_payment_message: true,
                    payment_message: 'Payments are taken either offline (via bank transfer or cash) or via the preferred method of PayPal.Me.',
                    show_disclaimer_message: true,
                    disclaimer_message: 'These items might change slightly when we finalise our plans.',
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                })
                .then(() => Promise.all([
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 1,
                        title: 'A Little Bit About Us',
                        content: 'In this section, you could describe a little bit about yourselves and maybe a message saying you can\'t wait to see everyone!', // eslint-disable-line max-len
                    })),
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 2,
                        title: 'RSVP',
                        content: 'In this section, you can provide the details for RSVPing and a note to remind everyone to include dietary requirements.',
                    })),
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 3,
                        title: 'About Our Day',
                        content: 'In this section, you could add the details for the ceremony and reception.',
                    })),
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 4,
                        title: 'Local Flavour',
                        content: 'In this section, you could add some of the things to do in the local area, it might be someones first time there!',
                    })),
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 5,
                        title: 'Staying At The Venue',
                        content: 'In this section, you could add the details for staying at the venue (if applicable).',
                    })),
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 6,
                        title: 'On The Day',
                        content: 'In this section, you could add the plan and timings for the big day(s).',
                    })),
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 7,
                        title: 'The Wedding Playlist',
                        content: 'In this section, you can add the details of how people can contribute to your wedding playlist (if applicable).',
                    })),
                    knex('sections').transacting(transaction).insert(createSection(knex, {
                        position: 8,
                        title: 'About our Honeymoon',
                        content: 'In this section, you could describe your honeymoon plans.',
                    })),
                ]))
                .then(() => knex('gifts').transacting(transaction).insert({
                    wedding_profile_id,
                    name: 'Flight (Example)',
                    image_url: 'https://i.ytimg.com/vi/4AlGn9K242I/maxresdefault.jpg',
                    requested: 10,
                    price: 10,
                    position: 1000000,
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                }))
                .then(() => knex('wedding_party_members').transacting(transaction).insert({
                    wedding_profile_id,
                    name: 'Person (Example)',
                    title: 'Role',
                    image_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
                    description: 'This is where you would give a funny (or serious) description of this person (and their role).',
                    position: 1000000,
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                }))
                .then(transaction.commit)
                .catch(transaction.rollback)
            )
            .then(() => {
                console.log('Initial seed completed successfully');
            });
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
