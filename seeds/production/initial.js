const comingSoonText = 'Coming Soon!';

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
