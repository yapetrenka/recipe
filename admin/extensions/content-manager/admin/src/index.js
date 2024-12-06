import RecipeList from './components/RecipeList';

const bootstrap = (app) => {
  app.injectContentManagerComponent('listView', 'actions', {
    name: 'RecipeList',
    Component: RecipeList,
  });
};

export default {
  bootstrap,
};
