<template>
	<div 
		ref="field"
		class="move-field"
	>
		<div class="move-field__title">
			JUST MY PERSONELL SITE
		</div>

		<move-object
			v-for="(obj, k) in objParams"
			:obj-props="obj"
			:num="k"
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
		'#F8CB81',
		'#FCE378',
		'#FDD395',
		'#FDFA98',
		'#ACE1A1',
		'#639BE3'
]
const NULL_OBJECT = {
	top: 0,
	left: 0,
	w: 0,
	h: 0,
	color: 'lightgrey',
	direction: 'right'	
}
const INIT_PARAMS = {
	numOfObj: 8,
	objStep: 1.5,
	width: 1,
	height: 1,
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
			fieldSize: {
				w: 0,
				h: 0
			}
		}
	},

	mounted() {
		let dir = 4

		window.addEventListener('resize', this.setFieldSize)
		this.setFieldSize() 
		this.objParams.forEach((obj, k) => { 
			obj.w = this.fieldSize.w / 4.2,
			obj.h = this.fieldSize.h / 4.2,
			obj.color = PALETTE[Math.floor(Math.random() * PALETTE.length)],
			obj.direction = DIRECTIONS[dir%4]
			dir += 1
			switch(obj.direction) {
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
					obj.left = Math.floor(Math.random() * (this.fieldSize.w - obj.w))
					break
				case 'down':
					obj.top = -obj.h
					obj.left = Math.floor(Math.random() * (this.fieldSize.w - obj.w))
					break
			}
			Vue.set(this.objParams, k, {...obj})
		})
		this.calculateStep()
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.setFieldSize)
	},

	methods: {
		setFieldSize() {
			this.fieldSize = {
				w: this.$refs.field.offsetWidth,
				h: this.$refs.field.offsetHeight,
			}
		},
		calculateStep() {
			this.objParams.forEach( (obj, k) => {
				let newPos

				switch(obj.direction) {
					case 'right':
						newPos = obj.left + this.objStep 
						if( this.isCollision(k, newPos) ) {
							Vue.set(this.objParams[k], 'direction', 'left')
						} else if(newPos >= this.fieldSize.w) {
							this.setNewObjParams(k)
						} else {
							obj.left += this.objStep
						}
						break
					case 'left':
						newPos = obj.left - this.objStep
						if( this.isCollision(k, newPos) ) {
							Vue.set(this.objParams[k], 'direction', 'right')
						} else if((newPos + obj.w) <= 0) {
							this.setNewObjParams(k)
						} else {
							obj.left -= this.objStep
						}
						break
					case 'up':
						newPos = obj.top - this.objStep
						if( this.isCollision(k, newPos) ) {
							Vue.set(this.objParams[k], 'direction', 'down')
						} else if((newPos + obj.h) <= 0) {
							this.setNewObjParams(k)
						} else {
							obj.top -= this.objStep
						}
						break
					case 'down':
						newPos = obj.top + this.objStep
						if( this.isCollision(k, newPos) ) {
							Vue.set(this.objParams[k], 'direction', 'up')
						} else if(newPos >= this.fieldSize.h) {
							this.setNewObjParams(k)
						} else {
							obj.top += this.objStep
						}
						break
				}
			})
			setTimeout( this.calculateStep, 50/3)
		},
		isCollision(num, newPos) {
			let cond = false
			let checkTop = this.objParams[num].top
			let checkBottom = this.objParams[num].top + this.objParams[num].h
			let checkLeft = this.objParams[num].left
			let checkRight = this.objParams[num].left + this.objParams[num].w

			this.objParams.forEach((obj, k) => {
				if(k === num) return

				let cond_1
				let cond_2

				switch(this.objParams[num].direction) {
					case 'right':
						cond_1 = (newPos + this.objParams[num].w) >= obj.left
						cond_2 = (newPos + this.objParams[num].w) <= (obj.left + obj.w)
						if(cond_1 && cond_2) {
							let cond_3 = (checkTop >= obj.top) && (checkTop <= (obj.top + obj.h))
							let cond_4 = (checkBottom >= obj.top) && (checkBottom <= (obj.top + obj.h))

							if(cond_3 || cond_4) cond = true   
						}
						break
					case 'left':
						cond_1 = newPos <= (obj.left + obj.w)
						cond_2 = newPos >= obj.left				
						if(cond_1 && cond_2) {
							let cond_3 = (checkTop >= obj.top) && (checkTop <= (obj.top + obj.h))
							let cond_4 = (checkBottom >= obj.top) && (checkBottom <= (obj.top + obj.h))

							if(cond_3 || cond_4) cond = true   
						}
						break
					case 'up':
						cond_1 = newPos <= (obj.top + obj.h)
						cond_2 = newPos >= obj.top
						if(cond_1 && cond_2) {
							let cond_3 = (checkLeft >= obj.left) && (checkLeft <= (obj.left + obj.w))
							let cond_4 = (checkRight >= obj.left) && (checkRight <= (obj.left + obj.w))

							if(cond_3 || cond_4) cond = true   
						}
						break
					case 'down':
						cond_1 = (newPos + this.objParams[num].h) >= obj.top
						cond_2 = (newPos + this.objParams[num].h) <= (obj.top + obj.h)
						if(cond_1 && cond_2) {
							let cond_3 = (checkLeft >= obj.left) && (checkLeft <= (obj.left + obj.w))
							let cond_4 = (checkRight >= obj.left) && (checkRight <= (obj.left + obj.w))

							if(cond_3 || cond_4) cond = true   
						}
						break
				}
			})

			return cond
		},
		setNewObjParams(num) {
			let newTop
			let newLeft
	
			switch(this.objParams[num].direction) {
				case 'right':
					newTop = Math.floor(Math.random() * (this.fieldSize.h - this.objParams[num].h))
					newLeft = -this.objParams[num].w
					break
				case 'left':
					newTop = Math.floor(Math.random() * (this.fieldSize.h - this.objParams[num].h))
					newLeft = this.fieldSize.w
					break
				case 'up':
					newTop = this.fieldSize.h
					newLeft = Math.floor(Math.random() * (this.fieldSize.w - this.objParams[num].w))
					break
				case 'down':
					newTop = -this.objParams[num].h
					newLeft = Math.floor(Math.random() * (this.fieldSize.w - this.objParams[num].w))
					break
			}
			Vue.set(this.objParams, num, {
				top: newTop,
				left: newLeft,
				w: this.fieldSize.w / 4.2,
				h: this.fieldSize.h / 4.2,
				color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
				direction: this.objParams[num].direction				
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
		25% {
			background-color: #82BED1;
		}
		50% {
			background-color: #8A9CCE;
		}
		75% {
			background-color: #82BED1;
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
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.move-field__title {
		font-size: 3rem;
		font-weight: bolder;
		color: grey;
		opacity: 0.7;
		z-index: 100;
	}
</style>
