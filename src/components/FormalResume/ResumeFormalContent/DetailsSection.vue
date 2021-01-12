<template>
	<div class="details-section">
		<div class="details-section__title">
			{{ info.title }}		
		</div>

		<div 
			class="details-section__item"
			v-for="(item, k) in info.items"
			:key="`${k}_${item.name}`"
		>
			<div class="item-name">
				{{ item.name }}
			</div>

			<div class="item-subsection">
				<div class="item-subsection__dates">
					{{`${item.dates.start} - ${item.dates.stop}`}}
				</div>

				<div class="item-subsection__position">
					{{ item.position }}
				</div>
			</div>

			<div class="item-details">
				{{ item.details }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		info: {
			type: Object,
			required: true,
		}
	},
}
</script>

<style lang="scss">
</style>
