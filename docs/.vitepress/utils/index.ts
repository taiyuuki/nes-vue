function copyright() {
    const start = 2023
    const now = new Date().getFullYear()
    const year = now === start ? '2023' : `${start}-${now}`
    return `Copyright © ${year} Taiyuuki`
}

export { copyright }
