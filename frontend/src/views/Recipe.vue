<template>
  <div class="recipe-detail">
    <h1>{{ recipe.title }}</h1>
    <Carousel v-if="recipe.image && recipe.image.length" class="recipe-detail__carousel" v-bind="config">
      <Slide v-for="(img, index) in recipe.image" :key="index">
        <img :src="getImageUrl(img.formats.small.url)" alt="Recipe Image" class="recipe-detail__image" />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <p class="recipe-detail__description">{{ recipe.description }}</p>
    <p class="recipe-detail__description" v-html="recipe.ingredients"></p>
    <router-link to="/recipes" class="back-to-recipes">Все рецепты</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const config = {
  itemsToShow: 1
};

export default {
  name: 'RecipeDetail',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  props: ['id'],
  data() {
    return {
      recipe: {}
    };
  },
  created() {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/recipes/${this.id}`)
        .then(response => {
          this.recipe = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  },
  methods: {
    getImageUrl(path) {
      return `${import.meta.env.VITE_API_URL}${path}`;
    }
  }
};
</script>

<style scoped>
.recipe-detail {
  padding: 20px;
}

.recipe-detail__carousel {
  max-width: 100%;
  margin-bottom: 20px;
}

.recipe-detail__image {
  max-width: 100%;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.recipe-detail__description {
  color: #777;
}

.back-to-recipes {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
}

.back-to-recipes:hover {
  text-decoration: underline;
}
</style>