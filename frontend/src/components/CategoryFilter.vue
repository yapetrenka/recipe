<template>
  <div class="category-filter">
    <label for="category" class="category-filter__lbl">Выберите категорию:</label>
    <select class="select-base" id="category" v-model="selectedCategory" @change="filterRecipes">
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

<style lang="scss" scoped>
.category-filter {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  &__lbl {
    margin-right: 10px;
    flex: none;
  }
}
</style>