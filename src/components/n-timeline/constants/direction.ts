export const DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN'
} as const

export type Direction = (keyof typeof DIRECTION)