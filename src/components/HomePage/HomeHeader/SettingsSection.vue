<template>
<div class="settings-section">
	<div class="settings-section__title">
		{{ $t(section.title) }}
	</div>

	<div
		:class="`settings-section__item ${isActive(k)}`"
		v-for="(item, k) in section.list"
		:key="`${k}_${item.value}`"
		@click="handleItemClicked(k)"
	>
		{{ $t(item.label) }}
	</div>
</div>
</template>

<script>
export default {
	props: {
		section: {
			type: Object,
			required: true,
		},
	},

	methods: {
		isActive(num) {
			return this.section.isActive === this.section.list[num].value? 'active': ''
		},
		handleItemClicked(num) {
			this.$emit('item-clicked', num)
		},
	},
}
</script>

<style lang="scss">
.settings-section {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0.3rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: white;
}
.settings-section__title {
	box-sizing: border-box;
	width: 100%;
	height: 2.2rem;
	padding: 0.2rem;
	margin-bottom: 0.2rem;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 1rem;
	font-weight: bold;
	color: grey;
	background-color: #f0f0f0;
}
.settings-section__item {
	box-sizing: border-box;
	width: 100%;
	height: 1.9rem;
	padding: 0.2rem;
	padding-left: 1rem;
	margin-bottom: 0.1rem;
	cursor: pointer;

	&.active {
		font-weight: bold;
		color: grey;
		background-color: #f8f8f8;
	}
	&:hover {
		opacity: 0.7;
	}
}
</style>
