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
			:label="labels[k]"
			:key="`${k}_${labels[k]}`"
			:ref="`move-object-${k}`"
			@clicked="handleMoveObjectClicked(k)"
		/>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import MoveObject from './MoveObject'

const HOME_ROUTES = [
	'ResumeFormal',
	'Freestyle',
	'Art',
	'Games',
]
const DIRECTIONS = [
	'left',
	'right',
	'up',
	'down',
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
		let objArr = []
		let labelsArr = []

		for(let i = 0; i < INIT_PARAMS.numOfObj; i++) {
			let obj ={ 
				id: `id_${i}`
			}
			objArr.push(Object.assign(obj, NULL_OBJECT)),
			labelsArr.push('') // (i in HOME_ROUTES)? HOME_ROUTES[i]: '')
		}

		return {
			objStep: INIT_PARAMS.objStep,
			objParams: objArr,
			fieldSize: {
				w: 0,
				h: 0
			},
			labels: labelsArr,
			regularAnimTimer: null,
			grouthEl: null,
			routeName: '',
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
			let top
			let left
			let w = this.fieldSize.w / 4.2
			let h = this.fieldSize.h / 4.2
			let direction = DIRECTIONS[dir%4]

			dir += 1
			switch(direction) {
				case 'right':
					top = Math.floor(Math.random() * (this.fieldSize.h - h))
					left = -w
					break
				case 'left':
					top = Math.floor(Math.random() * (this.fieldSize.h - h))
					left = this.fieldSize.w
					break
				case 'up':
					top = this.fieldSize.h
					left = Math.floor(Math.random() * (this.fieldSize.w - w))
					break
				case 'down':
					top = -h
					left = Math.floor(Math.random() * (this.fieldSize.w - w))
					break
			}
			Vue.set(this.objParams[k], 'direction', direction)
			Vue.set(this.objParams[k], 'top', top)
			Vue.set(this.objParams[k], 'left', left)
			Vue.set(this.objParams[k], 'w', w)
			Vue.set(this.objParams[k], 'h', h)
			Vue.set(this.objParams[k], 'color', this.currBlocksColors[Math.floor(Math.random() * this.currBlocksColors.length)])

		}) 
		this.setLabels()
		this.calculateStep()
		// setTimeout(this.setLabels, 3000)
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.setFieldSize)
	},

	methods: {
		setLabels() {
			for( let i = 0; i< this.labels.length; i++) {
				if( i in HOME_ROUTES ) {
					Vue.set(this.labels, i, HOME_ROUTES[i])
				}
			}
		},
		handleMoveObjectClicked(num) {
			if( !this.labels[num]) return

			this.routeName = this.labels[num]
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
			let routeName = this.routeName

			this.routeName = ''
			this.grouthEl.removeEventListener('animationend', this.onGrowthAnimationEnd)
			this.grouthEl = null
			this.$router.push({name: routeName})
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
			Vue.set(this.objParams[num], 'top', newTop)
			Vue.set(this.objParams[num], 'left', newLeft)
			Vue.set(this.objParams[num], 'w', this.fieldSize.w / 4.2,)
			Vue.set(this.objParams[num], 'h', this.fieldSize.h / 4.2,)
			Vue.set(this.objParams[num], 'color', this.currBlocksColors[Math.floor(Math.random() * this.currBlocksColors.length)])
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
	z-index: 5;
}
</style>
