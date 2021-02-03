<template>
  <div class="art-page-content">
    <art-header class="art-page__header"/>
    
    <art-list 
      v-if="mode === 'list'"
      class="art-page-content__list"
      @clicked="handleListClicked"
    />
    
    <art-one
      v-if="mode === 'one'"
      class="art-page-content__one"
      @clicked="handleOneClicked"
    />
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

  data() {
    return {
      mode: 'list' // enum with "mode | one" 
    }
  },

  methods: {
    handleListClicked() {
      this.mode = 'one'
    },
    handleOneClicked() {
      this.mode = 'list'
    },
  }
}
</script>

<style lang="scss">
.art-page-content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.art-page-content__header {
  height: 3rem;
  width: 100%;
  background-color: var(--c-back-1);
}
.art-page-content__list {
  width: 100%;
  flex: 1;
}
.art-page-content__one {
  box-sizing: border-box;
  height: 3rem;
  width: 100%;
  color: white;
  background-color: var(--c-back-3);
}
</style>
