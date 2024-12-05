<template>
  <div class="recipe-list">
    <ul class="recipe-list__items">
      <li v-for="recipe in recipes" :key="recipe.id" class="recipe-list__item">
        <h2 class="recipe-list__item-title">
          <router-link :to="{ name: 'Recipe', params: { id: recipe.id } }">{{ recipe.title }}</router-link>
        </h2>
        <p class="recipe-list__item-description">{{ recipe.description }}</p>
        <img v-if="recipe.image && recipe.image.length" :src="`${apiUrl}${recipe.image[0].formats.small.url}`" alt="Recipe Image" class="recipe-list__item-image" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RecipeList',
  data() {
    return {
      recipes: [],
      apiUrl: import.meta.env.VITE_API_URL
    };
  },
  created() {
    axios.get(`${this.apiUrl}/recipes`)
        .then(response => {
          this.recipes = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  }
};
</script>

<style lang="scss" scoped>
@use '@styles/variables' as *;
.recipe-list {
  font-family: Arial, sans-serif;
  padding: 20px;

  &__title {
    text-align: center;
    color: $primary-color;
  }

  &__items {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    background: #f9f9f9;
    margin: 10px 0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex: none;
    width: 50%;

    &:hover {
      transform: scale(1.02);
    }
  }

  &__item-title {
    margin: 0 0 10px;
    color: #555;
  }

  &__item-description {
    margin: 0 0 10px;
    color: #777;
  }

  &__item-image {
    max-width: 100%;
    border-radius: 8px;
  }
}
</style>