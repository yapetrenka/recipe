<template>
  <div>
    <h1>Рецепты</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <img v-if="recipe.image && recipe.image.length" :src="`http://localhost:1337${recipe.image[0].formats.small.url}`" alt="Recipe Image" />
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
      recipes: []
    };
  },
  created() {
    axios.get('http://localhost:1337/recipes')
        .then(response => {
          this.recipes = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  }
};
</script>