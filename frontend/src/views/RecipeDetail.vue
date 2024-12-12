<template>
  <div class="recipe-detail">
    <h1 v-if="recipe && recipe.title">{{ recipe.title }}</h1>
    <p v-else>Рецепт не найден</p>
    <p v-if="recipe" class="recipe-detail__description">{{ recipe.description }}</p>
    <div v-if="recipe" class="recipe-detail__layout">
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
      <div class="recipe-detail__ingredients" v-if="recipe.ingredients">
        <div v-html="recipe.ingredients"></div>
      </div>
    </div>
    <div class="recipe-detail__instructions" v-if="recipe && recipe.instructions">
      <div v-html="recipe.instructions"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
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
    VueEasyLightbox
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipe: null,
      lightboxVisible: false,
      lightboxImages: [],
      lightboxIndex: 0
    };
  },
  async created() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/recipes?filters[slug][$eq]=${this.slug}&populate=*`);
      if (response.data.data.length > 0) {
        const recipeData = response.data.data[0].attributes;
        this.recipe = {
          ...recipeData,
          image: recipeData.image.data.map(img => img.attributes)
        };
        this.lightboxImages = this.recipe.image.map(img => this.getImageUrl(img.formats.large.url));
      } else {
        throw new Error('Recipe not found');
      }
    } catch (error) {
      console.error('API error (recipe):', error);
    }
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

<style lang="scss" scoped>
@use '@styles/variables' as *;

.recipe-detail {
  &__description {
    color: $base-color-light;
    text-align: center;
    margin-bottom: 30px;
  }

  &__layout {
    display: flex;
  }

  &__carousel {
    flex: none;
    width: 50%;
  }

  &__image {
    max-width: 100%;
    border-radius: $border-radius-base;
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }

  &__ingredients {
    margin-left: 50px;
  }

  &__instructions {
    margin-top: 50px;
  }
}
</style>