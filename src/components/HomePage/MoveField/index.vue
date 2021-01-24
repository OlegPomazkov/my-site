<template>
	<div 
		ref="field"
		class="move-field"
	>
		<div class="move-field__title">
			{{ $t("site_title") }}
		</div>

		<move-object
			v-for="(obj, k) in objParams"
			:obj-props="obj"
			:num="k"
			:key="k"
			:ref="`move-object-${k}`"
			@clicked="handleMoveObjectClicked(k)"
		/>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import MoveObject from './MoveObject'

const DIRECTIONS = [
	'left',
	'right',
	'up',
	'down'
]
// const PALETTE = [
// 		'#EDAA8F',
// 		'#F8CB81',
// 		'#FCE378',
// 		'#FDD395',
// 		'#FDFA98',
// 		'#ACE1A1',
// 		'#639BE3'
// ]
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
			},
			regularAnimTimer: null,
			grouthEl: null,
		}
	},

	computed: {
		...mapGetters(['currBlocksColors'])
	},

	mounted() {
		let dir = 4

		window.addEventListener('resize', this.setFieldSize)
		this.setFieldSize() 
		this.objParams.forEach((obj, k) => { 
			obj.w = this.fieldSize.w / 4.2,
			obj.h = this.fieldSize.h / 4.2,
			obj.color = this.currBlocksColors[Math.floor(Math.random() * this.currBlocksColors.length)],
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

		// document.body.style.setProperty('--c-back-1', '#83DCD9')
		// document.body.style.setProperty('--c-back-2', '#82BED1')
		// document.body.style.setProperty('--c-back-3', '#8A9CCE')
		
		this.calculateStep()
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.setFieldSize)
	},

	methods: {
		handleMoveObjectClicked(num) {
			clearTimeout(this.regularAnimTimer)
			this.grouthEl = this.$refs[`move-object-${num}`][0].$el
			let styles = getComputedStyle(this.grouthEl)

			document.body.style.setProperty('--curr-top', styles.top)
			document.body.style.setProperty('--curr-left', styles.left)
			document.body.style.setProperty('--curr-width', styles.width)
			document.body.style.setProperty('--curr-height', styles.height)

			this.grouthEl.addEventListener('animationend', this.onGrowthAnimationEnd)
			this.grouthEl.classList.add('grouth-object')
		},
		onGrowthAnimationEnd() {
			this.grouthEl.removeEventListener('animationend', this.onGrowthAnimationEnd)
			this.grouthEl = null
			this.$router.push({name: 'ResumeFormal'})
		},
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
			this.regularAnimTimer = setTimeout( this.calculateStep, 50/3)
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
				color: this.currBlocksColors[Math.floor(Math.random() * this.currBlocksColors.length)],
				direction: this.objParams[num].direction				
			})
		}
	},
}
</script>

<style lang="scss">
@keyframes backcolors {
	from {
		background-color: var(--c-back-1);
	}
	25% {
		background-color: var(--c-back-2);
	}
	50% {
		background-color: var(--c-back-3);
	}
	75% {
		background-color: var(--c-back-2);
	}
	to {
		background-color: var(--c-back-1);
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
