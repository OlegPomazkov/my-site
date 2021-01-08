<template>
  <div class="home">
    <home-page />
  </div>
</template>

<script>
import HomePage from '@/components/HomePage'

export default {
  name: 'Home',
  components: {
    HomePage
  }
}
</script>

<style lang="scss">
.home {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
