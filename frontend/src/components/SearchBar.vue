<template>
  <div class="search-bar">
    <input class="inp-base" type="text" v-model="query" @input="onInput" placeholder="Поиск по ингредиентам" />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      query: ''
    };
  },
  methods: {
    onInput() {
      this.$emit('search', this.query);
    }
  }
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}
</style>