import { cn } from '@/lib/utils'

type AsElement =
  | 'div'
  | 'section'
  | 'article'
  | 'main'
  | 'header'
  | 'footer'
  | 'aside'
  | 'nav'
  | 'span'

type Size = 'narrow' | 'default' | 'wide' | 'full'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: AsElement
  size?: Size
}

const sizeClasses: Record<Size, string> = {
  narrow: 'max-w-3xl',
  default: '',
  wide: 'max-w-screen-2xl',
  full: 'max-w-none',
}

export function Container({
  children,
  className,
  as: Tag = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <Tag className={cn('container-default', sizeClasses[size], className)}>
      {children}
    </Tag>
  )
}
