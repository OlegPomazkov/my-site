import { PALETTES, PALETTE_CONFIG } from '@/assets/constants/palettes'
// import { PALETTE_CONFIG } from '@/assets/constants/palettes'

const palettes = PALETTES
const paletteConfig = PALETTE_CONFIG

export function setPalette(paletteName) {
	const palette = palettes.find( i => (i.name === paletteName))
	const html = document.getElementsByTagName('html')[0]

	palette.palette.blocks.forEach( item => {
		html.style.setProperty(paletteConfig[item.var], item.value)
	})
	palette.palette.backgrounds.forEach( item => {	
		html.style.setProperty(paletteConfig[item.var], item.value)
	})
}
