<template>
	<div 
		ref="field"
		class="move-field"
	>
		<move-object
			v-for="(obj, k) in objParams"
			:obj-props="obj"
			:key="k" 
		/>
	</div>
</template>

<script>
import Vue from 'vue'
import MoveObject from './MoveObject'

const DIRECTIONS = [
	'left',
	'right',
	'up',
	'down'
]
const PALETTE = [
		'#EDAA8F',
		'#FCE378',
		'#ACE1A1',
		'#639BE3'
] //,
// 	BACKS: [
// 		'#83DCD9',
// 		'#82BED1',
// 		'#8A9CCE'
// 	]
// }
const NULL_OBJECT = {
	top: 0,
	left: 0,
	w: 0,
	h: 0,
	color: 'lightgrey',
	direction: 'right'	
}
const INIT_PARAMS = {
	numOfObj: 4,
	objStep: 0.7,
	width: 300,
	height: 300,
}

export default {
	components: {
		MoveObject
	},

	data() {
		let arr = []

		for(let i = 0; i < INIT_PARAMS.numOfObj; i++) {
			arr.push({...NULL_OBJECT})
		}

		return {
			objStep: INIT_PARAMS.objStep,
			objParams: arr,
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
	mounted() {
		DIRECTIONS.forEach((item, k) => {
			let obj = {
				w: INIT_PARAMS.width,
				h: INIT_PARAMS.height,
				color: PALETTE[Math.floor(Math.random() * INIT_PARAMS.numOfObj)],
				direction: item
			}

			switch(item) {
				case 'right':
					obj.top = Math.floor(Math.random() * (this.fieldSize.h - obj.h))
					obj.left = -obj.w
					break
				case 'left':
					obj.top = Math.floor(Math.random() * (this.fieldSize.h - obj.h))
					obj.left = this.fieldSize.w
					break
				case 'up':
					obj.top = this.fieldSize.h
					obj.left = Math.floor(Math.random() * (this.fieldSize.h - obj.w))
					break
				case 'down':
					obj.top = -obj.h
					obj.left = Math.floor(Math.random() * (this.fieldSize.h - obj.w))
					break
			}
			Vue.set(this.objParams, k, {...obj})
		})
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
						if((obj.left - this.objStep + obj.w) <= 0) {
							this.setNewObjParams(k)
						} else {
							obj.left -= this.objStep
						}
						break
					case 'up':
						if((obj.top - this.objStep + obj.h) <= 0) {
							this.setNewObjParams(k)
						} else {
							obj.top -= this.objStep
						}
						break
					case 'down':
						if((obj.top + this.objStep) >= this.fieldSize.h) {
							this.setNewObjParams(k)
						} else {
							obj.top += this.objStep
						}
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
