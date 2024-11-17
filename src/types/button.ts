export namespace Button {
  export interface Props {
    label?: string
    design?: Design
    size?: Size
    circle?: boolean
  }

  type Design = 'default' | 'error' | 'positive'
  type Size = 'small' | 'large'
}