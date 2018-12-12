/**
 * Base Interface for all Assets
 */
export interface Asset {
  id: string
  type: string
  name: string
  value: string
  created: Date
  modified: Date
}

export class VideoAsset implements Asset {

  id: string
  type: string
  name: string
  value: string
  created: Date
  modified: Date

  constructor (obj: any) {
    Object.apply(this, obj)
    this.type = 'video'
    return this
  }
}

/**
 * Base Asset Class
 *
 * Intended to be extended upon by other asset classes
 */
export default function () {
  return {
    VideoAsset: VideoAsset
  }
}
