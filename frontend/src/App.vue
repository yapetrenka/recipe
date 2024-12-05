<template>
  <div id="app">
    <RecipeList />
  </div>
</template>

<script>
import RecipeList from './components/RecipeList.vue';

export default {
  name: 'App',
  components: {
    RecipeList
  }
};
</script>