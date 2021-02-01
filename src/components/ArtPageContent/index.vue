<template>
  <div class="home-page">
    <art-header class="home-page__header"/>
    <art-list class="home-page__main"/>
    <art-one class="home-page__footer"/>
  </div>
</template>

<script>
import ArtHeader from './ArtHeader'
import ArtList from './ArtList'
import ArtOne from './ArtOne'

export default {
  name: 'ArtPage',

  components: {
    ArtHeader,
    ArtList,
    ArtOne
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
  background-color: var(--c-back-1);
}
.home-page__main {
  width: 100%;
  flex: 1;
}
.home-page__footer {
  box-sizing: border-box;
  height: 3rem;
  width: 100%;
  color: white;
  background-color: var(--c-back-3);
}
</style>
