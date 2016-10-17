const wedding_profile_id = 1; // eslint-disable-line camelcase
const comingSoonText = 'Coming Soon!';

function createSection({ title, position }, knex) {
    return {
        title,
        position: position * 1000000,
        wedding_profile_id,
        content: comingSoonText,
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
                    gift_list_content: comingSoonText,
                    show_payment_message: true,
                    payment_message: 'Payments are taken either offline (via bank transfer or cash) or via the preferred method of PayPal.Me.',
                    show_disclaimer_message: true,
                    disclaimer_message: 'These items might change slightly when we finalise our plans.',
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                })
                .then(() => Promise.all([
                    knex('sections').transacting(transaction).insert(createSection({ title: 'A Little Bit About Us', position: 1 }, knex)),
                    knex('sections').transacting(transaction).insert(createSection({ title: 'RSVP', position: 2 }, knex)),
                    knex('sections').transacting(transaction).insert(createSection({ title: 'About Our Day', position: 3 }, knex)),
                    knex('sections').transacting(transaction).insert(createSection({ title: 'Local Flavour', position: 4 }, knex)),
                    knex('sections').transacting(transaction).insert(createSection({ title: 'Staying At The Venue', position: 5 }, knex)),
                    knex('sections').transacting(transaction).insert(createSection({ title: 'On The Day', position: 6 }, knex)),
                    knex('sections').transacting(transaction).insert(createSection({ title: 'The Wedding Playlist', position: 7 }, knex)),
                    knex('sections').transacting(transaction).insert(createSection({ title: 'About our Honeymoon', position: 8 }, knex)),
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
