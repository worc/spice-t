// TODO: SPK is not the only valid identification, add validation for other formats
import { open } from 'fs/promises'

/**
 * Tries to open the path and read the first 8 bytes of the file to check if it is a SPICE file.
 * Partial file-reading-by-bytes from stackoverflow: https://stackoverflow.com/a/76978551/769780
 *
 * @param path
 */
export default async function spiceIdentificationCheck (path: string): Promise<boolean> {
  // The SPICE file identification word occupying the first eight bytes of a properly
  // created binary SPK file is `DAF/SPK `. Note the white space at the end.
  // https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/FORTRAN/req/spk.html#SPK%20Files
  const SPICE_IDENTIFIER = 'DAF/SPK '
  const SPICE_HEADER_LENGTH = 8
  const OFFSET = 0
  const POSITION = 0

  try {
    // 'r': Open file for reading. An exception occurs if the file does not exist.
    // https://nodejs.org/api/fs.html#file-system-flags
    const handler = await open(path, 'r')
    const { buffer, bytesRead } = await handler.read(Buffer.alloc(SPICE_HEADER_LENGTH), OFFSET, SPICE_HEADER_LENGTH, POSITION)
    const value = buffer.toString('utf8', 0, bytesRead)

    return value === SPICE_IDENTIFIER
  } catch (e) {
    console.error(e)
    return false
  }
}
