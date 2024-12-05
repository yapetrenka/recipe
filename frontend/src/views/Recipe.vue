<template>
  <div>
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.description }}</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      recipe: {}
    };
  },
  created() {
    // Замените этот код на реальный запрос к API для получения данных рецепта
    const recipes = [
      { id: 1, title: 'Рецепт 1', description: 'Описание рецепта 1' },
      { id: 2, title: 'Рецепт 2', description: 'Описание рецепта 2' }
    ];
    this.recipe = recipes.find(recipe => recipe.id === parseInt(this.id));
  }
};
</script>