<template>
  <div class="home">
    <h1>Добро пожаловать на сайт рецептов</h1>
    <RecipeList :showOnHome="true" />
    <router-link to="/recipes" class="view-recipes">Посмотреть все рецепты</router-link>
  </div>
</template>

<script>
import RecipeList from '../components/RecipeList.vue';

export default {
  name: 'Home',
  components: {
    RecipeList
  }
};
</script>

<style scoped>
.home {
  text-align: center;
}

.view-recipes {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.view-recipes:hover {
  background-color: #0056b3;
}
</style>