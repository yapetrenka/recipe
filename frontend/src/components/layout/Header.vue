<template>
  <header class="header">
    <h1>Название сайта</h1>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/recipes">Рецепты</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
.header {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
}

nav {
  margin-top: 10px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}
</style>