<template>
	<div 
		ref="field"
		class="move-field"
	>
		<move-object
			:obj-props="objParams[0]" 
		/>
	</div>
</template>

<script>
import Vue from 'vue'
import MoveObject from './MoveObject'

// const DIRECTIONS = [
// 	'left',
// 	'right',
// 	'up',
// 	'down'
// ]
// const PALETTE = {
// 	BLOCKS: [
// 		'#EDAA8F',
// 		'#FCE378',
// 		'#ACE1A1',
// 		'#639BE3'
// 	],
// 	BACKS: [
// 		'#83DCD9',
// 		'#82BED1',
// 		'#8A9CCE'
// 	]
// }

export default {
	components: {
		MoveObject
	},

	data() {
		return {
			numOfObj: 1,
			objStep: 0.7,
			objParams: [],
		}
	},

	computed: {
		fieldSize() {
			return {
				w: this.$refs.field? this.$refs.field.offsetWidth: 200,
				h: this.$refs.field? this.$refs.field.offsetHeight: 200,
			}
		}
	},

	created() {
		let testObjParams ={
			top: 100,
			left: -60,
			w: 60,
			h: 60,
			color: 'lightgrey',
			direction: 'right'
		}
		this.objParams.push(testObjParams)
	},

	mounted() {
		this.calculateStep()
	},

	methods: {
		calculateStep() {
			this.objParams.forEach( (obj, k) => {
				switch(obj.direction) {
					case 'right':
						if((obj.left + this.objStep) >= this.fieldSize.w) {
							this.setNewObjParams(k)
						} else {
							obj.left += this.objStep
						}
						break
					case 'left':
						break
					case 'up':
						break
					case 'down':
						break
				}
			})
			setTimeout( this.calculateStep, 1000/60)
		},
		setNewObjParams(num) {
			let newTop = this.objParams[num].top === 100? 150: 100

			Vue.set(this.objParams, num, {
				top: newTop,
				left: -60,
				w: 60,
				h: 60,
				color: 'lightgrey',
				direction: 'right'				
			})
		}
	},
}
</script>

<style lang="scss">
	@keyframes backcolors {
		from {
			background-color: #83DCD9;
		}
		33% {
			background-color: #82BED1;
		}
		66% {
			background-color: #8A9CCE;
		}
		to {
			background-color: #83DCD9;
		}
	}
	.move-field {
		animation-name: backcolors;
		animation-duration: 15s;
		animation-iteration-count: infinite;

		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
