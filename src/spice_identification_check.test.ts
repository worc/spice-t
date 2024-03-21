import { describe, expect, jest, test } from '@jest/globals'
import spiceIdentificationCheck from './spice_identification_check'

// Relative to project root
const DE_202_PATH = 'kernels/de202.bsp'

describe('spiceIdentificationCheck', () => {
  test('should return true for a valid file', async () => {
    const result = await spiceIdentificationCheck(DE_202_PATH)
    expect(result).toBe(true)
  })

  test('should return false for an invalid file', async () => {
    console.error = jest.fn()
    const result = await spiceIdentificationCheck('invalid/path')
    expect(console.error).toHaveBeenCalled()
    expect(result).toBe(false)
  })
})
