<template>
  <div class="category-filter">
    <label for="category">Выберите категорию:</label>
    <select id="category" v-model="selectedCategory" @change="filterRecipes">
      <option value="">Все</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedCategory: ''
    };
  },
  methods: {
    filterRecipes() {
      this.$emit('filter', this.selectedCategory);
    }
  }
};
</script>

<style scoped>
.category-filter {
  margin-bottom: 20px;
}
</style>