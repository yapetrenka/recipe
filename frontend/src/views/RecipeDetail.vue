<template>
  <div class="recipe-detail">
    <h1 v-if="recipe.title">{{ recipe.title }}</h1>
    <p v-else>Рецепт не найден</p>
    <Carousel v-if="recipe.image && recipe.image.length" class="recipe-detail__carousel" v-bind="config">
      <Slide v-for="(img, index) in recipe.image" :key="index">
        <img :src="getImageUrl(img.formats.small.url)" alt="Recipe Image" class="recipe-detail__image" @click="showLightbox(index)" />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <vue-easy-lightbox
        :visible="lightboxVisible"
        :imgs="lightboxImages"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
    />
    <p class="recipe-detail__description">{{ recipe.description }}</p>
    <div class="recipe-detail__ingredients" v-if="recipe.ingredients && recipe.ingredients.length">
      <StrapiBlocks :content="recipe.ingredients" />
    </div>
    <div class="recipe-detail__instructions" v-if="recipe.instructions && recipe.instructions.length">
      <StrapiBlocks :content="recipe.instructions" />
    </div>
    <router-link to="/recipes" class="back-to-recipes">Все рецепты</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel';
import {StrapiBlocks} from 'vue-strapi-blocks-renderer';
import VueEasyLightbox from 'vue-easy-lightbox';

const config = {
  itemsToShow: 1
};

export default {
  name: 'RecipeDetail',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    StrapiBlocks,
    VueEasyLightbox
  },
  props: ['slug'],
  data() {
    return {
      recipe: {},
      lightboxVisible: false,
      lightboxImages: [],
      lightboxIndex: 0
    };
  },
  created() {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/api/recipes?filters[slug][$eq]=${this.slug}&populate=image`)
        .then(response => {
          if (response.data.data.length > 0) {
            this.recipe = response.data.data[0];
            this.lightboxImages = this.recipe.image.map(img => this.getImageUrl(img.formats.large.url));
          } else {
            throw new Error('Recipe not found');
          }
        })
        .catch(error => {
          console.error(error);
        });
  },
  methods: {
    getImageUrl(path) {
      return `${import.meta.env.VITE_API_URL}${path}`;
    },
    showLightbox(index) {
      this.lightboxIndex = index;
      this.lightboxVisible = true;
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
  cursor: pointer;
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