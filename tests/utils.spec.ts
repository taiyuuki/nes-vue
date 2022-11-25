import { describe, it, expect } from 'vitest'
import { getNow } from '../src/utils'

describe('utils', () => {
  it('should be file name with the time', () => {
    const reg = /\d{4}-\d{1,2}-\d{1,2}_\d{2}-\d{2}-\d{2}/
    expect(reg.test(getNow())).toMatchInlineSnapshot('true')
  })
})