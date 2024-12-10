module.exports = ({ env }) => ({
    'random-sort': {
        enabled: true,
    },
    slugify: {
        enabled: true,
        config: {
            contentTypes: {
                recipe: {
                    field: 'slug',
                    references: 'title',
                },
            },
        },
    },
});