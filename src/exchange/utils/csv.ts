//TODO: Add unit tests
import { readFileSync, unlinkSync } from 'fs';
import { extname, join } from 'path';
import { parse } from 'papaparse';

export const csvFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(new Error('Only CSV files are allowed!'), false);
  }
  callback(null, true);
};

export const csvFileName = (req, file, callback) => {
  //const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `data${fileExtName}`);
};

export const deleteCsvFile = async () => {
  //const name = file.originalname.split('.')[0];
  const path = getCSVFile();
  unlinkSync(path);
};

export const getCSVFile = () => {
  //TODO> Make sure this works when deployed too, the route may change, on the built version
  const filePath = join(__dirname, '..', '..', '..', 'uploads/csv', 'data.csv');
  return filePath;
};

export const parseCSV = () => {
  //TODO: Error handling
  const csvPath = getCSVFile();
  const stream = readFileSync(csvPath);

  const entities = parse(stream.toString(), {
    header: true,
    skipEmptyLines: true,
  });
  // TODO: Delete CSV after saving or if there is any error after uploading the CSV, from the file system
  return entities.data;
};
