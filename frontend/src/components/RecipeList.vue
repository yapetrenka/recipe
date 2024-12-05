<template>
  <div>
    <h1>Рецепты</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <img v-if="recipe.image && recipe.image.length" :src="`${apiUrl}${recipe.image[0].formats.small.url}`" alt="Recipe Image" />
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