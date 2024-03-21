/**
 * The File Record is the first 1024 bytes of a SPICE binary file, with various metadata fields
 *
 * https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/C/req/daf.html#The%20File%20Record
 */
export default interface SpiceFileRecord {
  // The file architecture word, indicates this is a Double Precision Array File (DAF)
  FileArchitecture: 'DAF',

  // The file identification word, indicates the type of data stored in the Double Precision Array File (DAF)
  IdWord: string,

  // TODO: verify if they mean array summary or summary record or if they're the same thing?
  // The number of double precision components in each array summary (summary record?)
  ND: number,

  // The number of integer components in each array summary (summary record?)
  NI: number,

  // The internal name or description of the file
  InternalFileName: string,

  // The record number of the first summary record, typically the same as the backward record pointer
  ForwardRecordPointer: number,

  // The record number of the last summary record, typically the same as the forward record pointer
  BackwardRecordPointer: number,

  // The first free address in the file, new data added to the file will be appended here
  FirstFreeAddress: number,

  // It's unclear what standard this is referring to, but appears to be indicating that
  // this file will be in either little endian or big endian format
  BinaryFileFormat: 'LTL-IEEE' | 'BIG-IEEE',

  // A block of 603 nulls separate the file format and the FTP validation string in order
  // to place the beginning of the FTP validation string at character 700 (address 699)
  PreFtpNullPaddingValid: boolean,

  // It's unclear how this achieves validation, but it's a string of 28 characters
  FtpValidationString: string,

  // A block of 297 nulls to enforce the 1024 byte length of the file record
  PostFtpNullPaddingValid: boolean,
}
