<template>
  <div class="recipes-page">
    <h1 class="recipes-page__title">Все рецепты</h1>
    <div class="recipes-page__description">
      <p>Здесь вы найдете множество вкусных рецептов.</p>
    </div>
    <RecipeList />
    <!-- Добавьте другие элементы и текст здесь -->
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
  &__title {
    text-align: center;
    color: $primary-color;
  }

  &__description {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>