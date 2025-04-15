
export function fillFalse(num: number): boolean[] {
    return Array(num).fill(false)
}

export function gpFilter<T>(arr: T[]): NonNullable<T>[] {
    return arr.filter(Boolean) as NonNullable<T>[]
}

export function toHexNumber(str: string) {
    return Number(`0x${str}`)
}
