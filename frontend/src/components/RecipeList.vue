<template>
  <div class="filter-panel"  v-if="!showOnHome">
    <div class="filter-panel__category">
      <CategoryFilter :categories="categories" @filter="filterRecipes" />
    </div>
    <div class="filter-panel__search">
      <SearchBar @search="searchRecipes" />
    </div>
  </div>
  <div class="recipe-list">
    <ul class="recipe-list__items">
      <li v-for="recipe in filteredRecipes" :key="recipe.id" class="recipe-list__item">
        <div class="recipe-list__item-title">
          <router-link v-if="recipe.id" :to="{ name: 'Recipe', params: { slug: recipe.slug } }">{{ recipe.title }}</router-link>
        </div>
        <p class="recipe-list__item-description">{{ recipe.description }}</p>
        <router-link v-if="recipe.id" :to="{ name: 'Recipe', params: { slug: recipe.slug } }">
          <img v-if="recipe.image && recipe.image.length" :src="getImageUrl(recipe.image[0].formats.small.url)" alt="Recipe Image" class="recipe-list__item-image" />
        </router-link>
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
      let filter = 'populate=*';
      if (this.showOnHome) {
        filter = `filters[showOnHome]=true&${filter}`;
      }
      try {
        const response = await axios.get(`${this.apiUrl}/api/recipes?${filter}`);
        console.log(response)
        this.recipes = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.filteredRecipes = this.recipes;
        console.log('Recipes loaded:', this.recipes); // Вывод данных в консоль
      } catch (error) {
        console.error('API error (recipes):', error);
      }
    },
    extractTextFromIngredients(ingredients) {
      const extractText = (obj) => {
        if (typeof obj === 'string') {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map(extractText).join(' ');
        }
        if (typeof obj === 'object' && obj !== null) {
          return Object.values(obj).map(extractText).join(' ');
        }
        return '';
      };
      return extractText(ingredients).toLowerCase();
    },
    filterRecipes(category) {
      const filteredByCategory = category
          ? this.recipes.filter(recipe => Array.isArray(recipe.categories) && recipe.categories.some(cat => cat.name === category))
          : this.recipes;
      this.filteredRecipes = this.searchQuery
          ? filteredByCategory.filter(recipe => {
            const ingredientsText = this.extractTextFromIngredients(recipe.ingredients);
            return ingredientsText.includes(this.searchQuery);
          })
          : filteredByCategory;
    },
    searchRecipes(query) {
      this.searchQuery = query ? query.toLowerCase() : '';
      this.filteredRecipes = this.searchQuery
          ? this.recipes.filter(recipe => {
            const ingredientsText = this.extractTextFromIngredients(recipe.ingredients);
            return ingredientsText.includes(this.searchQuery);
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
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    background: $bg-color;
    padding: 20px;
    border-radius: $border-radius-base;
    transition: transform 0.2s;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: scale(1.02);
    }
    &-title {
      font-size: 22px;
      margin: 0 0 10px;
    }

    &-description {
      flex: 1;
      margin: 0 0 10px;
      color: $base-color-light;
      font-size: .8em;
    }

    &-image {
      max-width: 100%;
      border-radius: $border-radius-base;
    }
  }
}

.filter-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  &__category {

  }
  &__search {

  }
}
</style>