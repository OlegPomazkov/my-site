<template>
  <div class="coming-soon">
	<div class="coming-soon__content">
		<div class="coming-soon__content__title">
			{{$t('coming_soon_message')}}
		</div>

		<div 
			class="coming-soon__content__control"
			@click="handleControlClicked"
		>
			{{$t('coming_soon_home')}}
		</div>
	</div>
  </div>
</template>

<script>
export default {
	methods: {
		handleControlClicked() {
			this.$router.push({name: 'Home'})
		}
	}
}
</script>

<style type="scss">
.coming-soon {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: grey;
}
.coming-soon__content {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: grey;
}
.coming-soon__content__title {
	margin-bottom: 1rem;
	font-weight: bold;
	font-size: 2rem;
}
.coming-soon__content__control {
	box-sizing: border-box;
	width: 10rem;
	height: 10rem;
	display: flex;
	justify-content: center;
	align-items:center;
	font-size: 1.5rem;
	color: lightgrey;
	background-color: white;
	border: 1px solid lightgrey;
	border-radius: 50%;
}
.coming-soon__content__control:hover {
	cursor: pointer;
	background-color: #f5f5f5;
}	
</style>
