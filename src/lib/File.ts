
export const readFileRaw = (e: any): Promise<any> =>
  new Promise((resolve) => resolve(e.target.files[0]))

/**
 * Base function for reading files, takes an event from a file field
 * and returns a promise that resolves with the file as a data url (blob)
 */
export const readFile = (e: any): Promise<string> => {
  const file = e.target.files[0]
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    })
    reader.readAsText(file)
  })
}

/**
 * Takes file input events and returns a promise which resolves a HTMLImageElement
 */
export const readImage = (e: any): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    return readFile(e).then(res => {
      const img = new Image()
      img.addEventListener('load', () => {
        resolve(img)
      })
      img.src = res
    })
  })
}
