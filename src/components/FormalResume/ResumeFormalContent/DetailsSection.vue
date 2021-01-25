<template>
	<div class="details-section">
		<div 
			v-if="info.title"
			class="details-section__title"
		>
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
				<div 
					v-if="item.position"
					class="item-subsection__position"
				>
					{{ item.position }}
				</div>

				<div 
					v-if="item.dates"
					class="item-subsection__dates"
				>
					{{`${item.dates.start} - ${item.dates.stop}`}}
				</div>
			</div>

			<div 
				class="item-details"
				v-for="(part, k) in item.details"
				:key="`${k}_${part.split(0, 5)}`"
			>
				{{ part }}
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
.details-section {
	box-sizing: border-box;
	width: 100%;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	border-bottom: 1px solid #f0f0f0;
}
.details-section__title {
	margin-bottom: 0.8rem;
	font-size: 1.2rem;
	font-weight: bold;
	color: grey;
}
.details-section__item {
	margin-bottom: 0.5rem;
	color: black;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	.item-name {
		margin-bottom: 0.25rem;
		font-size: 1rem;
		font-weight: bold;
		color: grey;
	}
	.item-subsection {
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 0.25rem;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		&__position {
			font-size: 0.9rem;
			font-weight: bold;
			color: grey;
		}
		&__dates {
			margin-left: 1.5rem;
			font-size: 0.9rem;
			font-style: italic;
			color: black;
		}
	}
	.item-details {
		font-size: 0.8rem;
		color: black;
	}
}
</style>
