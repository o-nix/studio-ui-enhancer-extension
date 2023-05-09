import mountChromeExtensionIntoDom from './src/main'

const div = document.createElement('div')
div.id = 'studio-ui-enhancer-extension'
document.body.appendChild(div)

mountChromeExtensionIntoDom(div.id)
