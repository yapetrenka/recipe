module.exports = ({ env }) => ({
  'content-manager': {
    enabled: true,
    resolve: './node_modules/strapi-plugin-content-manager',
  },
  'content-type-builder': {
    enabled: true,
    resolve: './node_modules/strapi-plugin-content-type-builder',
  },
  'content-manager': {
    enabled: true,
    resolve: './node_modules/strapi-plugin-content-manager',
    bootstrap(app) {
      app.injectContentManagerComponent('listView', 'actions', {
        name: 'RecipeList',
        Component: require('../extensions/content-manager/admin/src/components/RecipeList').default,
      });
    },
  },
});
