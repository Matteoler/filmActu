const FontFamily = {
    SongMyung: ['var(--font-songmyung)', 'serif'],
    Neutro: ['var(--font-neutro)', 'serif'],
    SegoeUI: ['var(--font-segoeui)', 'serif'],
}

const MIN_SIZE = 10
const MAX_SIZE = 128

const largeSpecificSizing = [206, 160, 150, 134]

const letterSpacing = {
    tighter: '-.04em',
    tightly: '-.03em',
    tight: '-.02em',
    snug: '-.01em',
    normal: '0',
    roomy: '.01em',
    wider: '.04em',
}

const lineHeight = {
    narrow: '0.9',
    near: '1.0',
    tight: '1.1',
    snug: '1.2',
    comfy: '1.3',
    moderate: '1.4',
}

const regularSizing = new Array(MAX_SIZE - MIN_SIZE + 1).fill(null).map((item, idx) => MIN_SIZE + idx)
const sizes = [...regularSizing, ...largeSpecificSizing]

const max = px => {
    return `max(${px}px, ${px / 16}rem)`
}

const fontSize = sizes.reduce((result, size) => {
    result[size] = [max(size)]
    return result
}, {})

module.exports = {fontSize, FontFamily, letterSpacing, lineHeight, sizes}