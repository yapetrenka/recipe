<template>
  <CategoryFilter v-if="!showOnHome" :categories="categories" @filter="filterRecipes" />
  <SearchBar v-if="!showOnHome" @search="searchRecipes" />
  <div class="recipe-list">
    <ul class="recipe-list__items">
      <li v-for="recipe in filteredRecipes" :key="recipe.id" class="recipe-list__item">
        <h2 class="recipe-list__item-title">
          <router-link v-if="recipe.id" :to="{ name: 'Recipe', params: { slug: recipe.slug } }">{{ recipe.title }}</router-link>
        </h2>
        <p class="recipe-list__item-description">{{ recipe.description }}</p>
        <img v-if="recipe.image && recipe.image.length" :src="getImageUrl(recipe.image[0].formats.small.url)" alt="Recipe Image" class="recipe-list__item-image" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import CategoryFilter from './CategoryFilter.vue';
import SearchBar from './SearchBar.vue';

export default {
  name: 'RecipeList',
  components: {
    CategoryFilter,
    SearchBar
  },
  props: {
    showOnHome: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipes: [],
      filteredRecipes: [],
      categories: [],
      searchQuery: '',
      apiUrl: import.meta.env.VITE_API_URL
    };
  },
  created() {
    this.fetchCategories();
    this.fetchRecipes();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(`${this.apiUrl}/api/categories`);
        this.categories = response.data.data.map(category => category.name);
      } catch (error) {
        console.error('API error (categories):', error);
      }
    },
    async fetchRecipes() {
      let filter = 'populate=image&populate=categories';
      if (this.showOnHome) {
        filter = `filters[showOnHome]=true&${filter}`;
      }
      try {
        const response = await axios.get(`${this.apiUrl}/api/recipes?${filter}`);
        this.recipes = response.data.data;
        this.filteredRecipes = this.recipes;
        console.log('Recipes loaded:', this.recipes); // Вывод данных в консоль
      } catch (error) {
        console.error('API error (recipes):', error);
      }
    },
    filterRecipes(category) {
      const filteredByCategory = category
          ? this.recipes.filter(recipe => Array.isArray(recipe.categories) && recipe.categories.some(cat => cat.name === category))
          : this.recipes;
      this.filteredRecipes = this.searchQuery
          ? filteredByCategory.filter(recipe => {
            const ingredientsText = recipe.ingredients.map(ingredient => ingredient.children.map(child => child.text).join(' ')).join(' ');
            return ingredientsText.toLowerCase().includes(this.searchQuery);
          })
          : filteredByCategory;
    },
    searchRecipes(query) {
      this.searchQuery = query ? query.toLowerCase() : '';
      this.filteredRecipes = this.searchQuery
          ? this.filteredRecipes.filter(recipe => {
            const ingredientsText = recipe.ingredients.map(ingredient => ingredient.children.map(child => child.text).join(' ')).join(' ');
            return ingredientsText.toLowerCase().includes(this.searchQuery);
          })
          : this.recipes;
    },
    getImageUrl(path) {
      return `${this.apiUrl}/${path}`;
    }
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
    width: 33.33%;

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