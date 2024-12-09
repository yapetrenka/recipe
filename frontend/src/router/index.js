import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import RecipeList from '../views/RecipeList.vue';
import Recipe from '../views/RecipeDetail.vue';
import StaticPage from '../views/StaticPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/recipes',
        name: 'RecipeList',
        component: RecipeList
    },
    {
        path: '/recipes/:slug',
        name: 'Recipe',
        component: Recipe,
        props: true
    },
    {
        path: '/static-pages/:slug',
        name: 'StaticPage',
        component: StaticPage,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;