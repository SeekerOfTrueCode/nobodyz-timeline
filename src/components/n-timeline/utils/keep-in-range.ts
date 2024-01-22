export function keepInRange(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}