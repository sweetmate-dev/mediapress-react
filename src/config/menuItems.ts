import { keys } from 'ramda'

/**
 * An Object where its keys represent selectable menu items and
 * it's values represent the menu labels
 */
export const MenuItems = {
  'preview': 'Preview',
  'elements': 'Elements',
  'add-scene': 'Add Scene',
  'audio': 'Audio',
  'settings': 'Settings',
  'export': 'Export'
}

/**
 * An Enum type of Menu Items
 */
export type MenuItem = keyof typeof MenuItems

/**
 * A list of MenuItem Keys
 */
export const MenuItemKeys = (keys(MenuItems) as MenuItem[])

export default MenuItems
