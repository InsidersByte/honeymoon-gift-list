const comingSoonText = 'Coming Soon!';

exports.seed = knex =>
    knex('wedding_profiles')
        .del()
        .then(() =>
            knex('wedding_profiles').insert({
                id: 1,
                cover_title: 'Our Wedding',
                cover_image_url: 'http://www.giveasyoulive.com/blog/wp-content/uploads/2016/07/fpt-112704-Wedding-Flowers.jpg',
                wedding_date: knex.fn.now(),
                gift_list_content: comingSoonText,
                payment_message: comingSoonText,
                disclaimer_message: comingSoonText,
            })
        )
        .then(() => knex('sections').del())
        .then(() =>
            Promise.all([
                knex('sections').insert({ id: 1, title: 'About Us', content: comingSoonText, position: 100000, wedding_profile_id: 1 }),
                knex('sections').insert({ id: 2, title: 'RSVP', content: comingSoonText, position: 200000, wedding_profile_id: 1 }),
                knex('sections').insert({ id: 3, title: 'About Our Day', content: comingSoonText, position: 300000, wedding_profile_id: 1 }),
                knex('sections').insert({ id: 4, title: 'Local Flavour', content: comingSoonText, position: 400000, wedding_profile_id: 1 }),
                knex('sections').insert({ id: 5, title: 'On The Day', content: comingSoonText, position: 500000, wedding_profile_id: 1 }),
                knex('sections').insert({ id: 6, title: 'The Wedding Playlist', content: comingSoonText, position: 600000, wedding_profile_id: 1 }),
            ])
        );
