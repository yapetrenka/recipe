<template>
  <div class="recipes-page">
    <h1>Все рецепты</h1>
    <div class="recipes-page__description">
      <p>Здесь вы найдете множество вкусных рецептов</p>
    </div>
    <RecipeList />
  </div>
</template>

<script>
import RecipeList from '../components/RecipeList.vue';

export default {
  name: 'Recipes',
  components: {
    RecipeList
  }
};
</script>

<style lang="scss" scoped>
@use '@styles/variables' as *;

.recipes-page {
  &__description {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>