const wedding_profile_id = 1; // eslint-disable-line camelcase
const comingSoonText = 'Coming Soon!';

function createSection({ title, position }, knex) {
    return {
        title,
        position,
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

            return knex.transaction(trx =>
                knex('wedding_profiles').transacting(trx).insert({
                    id: 1,
                    cover_title: 'Our Wedding',
                    cover_image_url: 'http://www.giveasyoulive.com/blog/wp-content/uploads/2016/07/fpt-112704-Wedding-Flowers.jpg',
                    wedding_date: knex.fn.now(),
                    gift_list_content: comingSoonText,
                    payment_message: comingSoonText,
                    disclaimer_message: comingSoonText,
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                })
                .then(() => Promise.all([
                    knex('sections').transacting(trx).insert(createSection({ title: 'About Us', position: 100000 }, knex)),
                    knex('sections').transacting(trx).insert(createSection({ title: 'RSVP', position: 200000 }, knex)),
                    knex('sections').transacting(trx).insert(createSection({ title: 'About Our Day', position: 300000 }, knex)),
                    knex('sections').transacting(trx).insert(createSection({ title: 'Local Flavour', position: 400000 }, knex)),
                    knex('sections').transacting(trx).insert(createSection({ title: 'On The Day', position: 500000 }, knex)),
                    knex('sections').transacting(trx).insert(createSection({ title: 'The Wedding Playlist', position: 600000 }, knex)),
                ]))
                .then(() => knex('gifts').transacting(trx).insert({
                    wedding_profile_id,
                    name: 'Flight',
                    image_url: 'https://i.ytimg.com/vi/4AlGn9K242I/maxresdefault.jpg',
                    requested: 10,
                    price: 10,
                    position: 100000,
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                }))
                .then(() => knex('wedding_party_members').transacting(trx).insert({
                    wedding_profile_id,
                    name: 'Person',
                    title: 'Master',
                    image_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
                    description: 'This person is the master!',
                    position: 100000,
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                }))
                .then(trx.commit)
                .catch(trx.rollback)
            )
            .then(() => {
                console.log('Initial seed completed successfully');
            });
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
