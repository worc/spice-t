import { open } from 'fs/promises'
import SpiceFileRecord from './types/SpiceFileRecord'

function littleEndianBytesToInt(bytes: Uint8Array): number {
  let result = 0;
  for (let i = 0; i < bytes.length; i++) {
    result += bytes[i] << (i * 8);
  }
  return result;
}

/**
 * Parses the first 1024 bytes of a SPICE binary file, the File Record
 *
 * @param path
 */
export default async function spiceFileRecordParser (path: string): Promise<SpiceFileRecord> {
  const FILE_RECORD_LENGTH = 1024
  const OFFSET = 0
  const POSITION = 0

  const handler = await open(path, 'r')
  const { buffer, bytesRead } = await handler.read(Buffer.alloc(FILE_RECORD_LENGTH), OFFSET, FILE_RECORD_LENGTH, POSITION)
  const value = buffer.toString('utf8', 0, bytesRead)

  const FileArchitecture = value.slice(0, 3) as 'DAF'
  const IdWord = value.slice(0, 8)
  const ND = littleEndianBytesToInt(new Uint8Array([...value.slice(8, 12)].map(char => char.charCodeAt(0))))
  const NI = littleEndianBytesToInt(new Uint8Array([...value.slice(12, 16)].map(char => char.charCodeAt(0))))
  const InternalFileName = value.slice(16, 76).trim() // Lots of white space padding after the internal file name
  const ForwardRecordPointer = littleEndianBytesToInt(new Uint8Array([...value.slice(76, 80)].map(char => char.charCodeAt(0))))
  const BackwardRecordPointer = littleEndianBytesToInt(new Uint8Array([...value.slice(80, 84)].map(char => char.charCodeAt(0))))
  const FirstFreeAddress = littleEndianBytesToInt(new Uint8Array([...value.slice(84, 88)].map(char => char.charCodeAt(0))))
  const BinaryFileFormat = value.slice(88, 88+8) as 'LTL-IEEE' | 'BIG-IEEE'
  const PreFtpNullPaddingValid = value.slice(96, 699).split('').every(char => char === '\0')
  const FtpValidationString = value.slice(699, 727)
  const PostFtpNullPaddingValid = value.slice(727, 1024).split('').every(char => char === '\0')

  return {
    FileArchitecture,
    IdWord,
    ND,
    NI,
    InternalFileName,
    ForwardRecordPointer,
    BackwardRecordPointer,
    FirstFreeAddress,
    BinaryFileFormat,
    PreFtpNullPaddingValid,
    FtpValidationString,
    PostFtpNullPaddingValid,
  }
}
