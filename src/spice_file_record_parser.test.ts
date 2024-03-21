import { describe, expect, test } from '@jest/globals'
import spiceFileRecordParser from './spice_file_record_parser'

// Relative to project root
const DE_202_PATH = 'kernels/de202.bsp'

describe('spiceFileRecordParser', () => {
  test('should return a file record with values for every field', async () => {
    const result = await spiceFileRecordParser(DE_202_PATH)
    expect(result.FileArchitecture).toEqual('DAF')
    expect(result.IdWord).toEqual('DAF/SPK ')
    expect(result.ND).toEqual(2)
    expect(result.NI).toEqual(6)
    expect(result.InternalFileName).toEqual('NIO2SPK')
    expect(result.ForwardRecordPointer).toEqual(3)
    expect(result.BackwardRecordPointer).toEqual(3)
    expect(result.FirstFreeAddress).toEqual(1899865)
    expect(result.BinaryFileFormat).toEqual('LTL-IEEE')
    expect(result.PreFtpNullPaddingValid).toBe(true)
    expect(result.FtpValidationString.startsWith('FTPSTR:') && result.FtpValidationString.endsWith('ENDFTP')).toBe(true)
    expect(result.PostFtpNullPaddingValid).toBe(true)
  })
})
