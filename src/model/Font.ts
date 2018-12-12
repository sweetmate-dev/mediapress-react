import { find, propEq } from 'ramda'

const url = f => 'https://fonts.googleapis.com/css?family=' + f

export default class Font {

  static globalFonts = [
    'Roboto',
    'Roboto Mono',
    'Roboto Condensed',
    'Roboto Slab',
    'Montserrat',
    'Open Sans',
    'Arvo',
    'Abril Fatface',
    'Alfa Slab One',
    'Josefin Sans',
    'Josefin Slab',
    'Lato',
    'Lobster',
    'Merriweather',
    'Merriweather Sans',
    'Nunito',
    'Pacifico',
    'Quicksand',
    'Raleway',
    'Source Sans Pro',
    'Source Serif Pro'
  ].map(x => new Font(x))

  name: string
  value: string
  url: string

  constructor (name: string) {
    this.name = name
    this.value = name.replace(' ', '-')
    this.url = url(name)
    return this
  }

  static fontName (name: string) {
    return find(propEq('name', name))(Font.globalFonts)
  }

}
