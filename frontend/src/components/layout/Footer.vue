<template>
  <footer class="main-footer">
    <p>&copy; 2023 Название сайта. Все права защищены.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="scss" scoped>
@use '@styles/variables' as *;

.main-footer {
  border-top: 1px solid $base-color;
  padding: 30px;
  text-align: center;
  width: 100%;
  margin-top: 50px;
}
</style>