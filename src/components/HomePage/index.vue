<template>
  <div class="home-page">
    <home-header class="home-page__header"/>
    <move-field class="home-page__main"/>
    <home-footer class="home-page__footer"/>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import MoveField from './MoveField'
import HomeFooter from './HomeFooter'

export default {
  name: 'HomePage',

  components: {
    HomeHeader,
    MoveField,
    HomeFooter
  },
}
</script>

<style lang="scss">
.home-page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.home-page__header {
  height: 3rem;
  width: 100%;
  background-color: lightgrey;
}
.home-page__main {
  width: 100%;
  flex: 1;
}
.home-page__footer {
  height: 3rem;
  width: 100%;
  color: white;
  background-color: salmon;
}
</style>
