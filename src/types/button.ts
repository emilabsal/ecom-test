export namespace Button {
  export interface Props {
    label?: string
    design?: Design
    size?: Size
    circle?: boolean
    fullWidth?: boolean
  }

  type Design = 'default' | 'negative' | 'positive'
  type Size = 'small' | 'large'
}
