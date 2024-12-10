<template>
  <header class="main-header">
    <div class="main-header__logo">
      <a href="/" class="main-header__logo-link">
        <img src="@images/logo.svg" alt="Логотип">
      </a>
    </div>
    <nav class="main-header__nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/recipes">Рецепты</router-link>
      <router-link to="/pages/about">Обо мне</router-link>
      <router-link to="/pages/ideas">Идеи</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang="scss" scoped>
@use '@styles/variables' as *;

.main-header {
  padding: 30px 0;
  &__logo {
    position: relative;
    display: flex;
    justify-content: center;
    &:before {
      border-top: 1px solid $base-color;
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
    }
    &-link {
      background-color: #fff;
      display: block;
      padding: 0 25px;
      position: relative;
      z-index: 1;
      img {
        width: 100px;
      }
    }
  }
  &__nav {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    a {
      color: $base-color;
      font-size: 18px;
      margin: 0 10px;
      text-decoration: none;
    }
  }
}
</style>