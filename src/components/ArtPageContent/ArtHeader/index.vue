<template>
	<div class="home-header">
		<div class="home-header__wrapper">
			<div class="home-header__wrapper__pages">
				HOME
			</div>

			<div class="home-header__wrapper__pages">
				TITLE
			</div>

			<div class="home-header__wrapper__pages">
				LOCALE
			</div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.home-header {
	box-sizing: border-box;
	width: 100%;
	height: 4rem;
}
.home-header__wrapper {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
	padding-left: 1rem;
	padding-right: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.home-header__wrapper__pages {
	box-sizing: border-box;
	flex: 1;
	max-width: 40rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;	
}
.home-header__wrapper__control {	
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
