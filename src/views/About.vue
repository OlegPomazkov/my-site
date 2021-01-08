<template>
  <div class="about">
    <h1>This is an about page</h1>
	<h2>{{$t('message')}}</h2>
  </div>
</template>

<script>
export default {
	created() {
		this.$i18n.locale = this.$i18n.locale === 'en'? 'ru': 'en'
	}
}
</script>
