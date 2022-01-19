import { Schema, model } from 'mongoose';
import Table from '../types/Table';

const tableSchema: Schema = new Schema<Table>({
  size: Number,
  number: Number,
});

const tableModel = model<Table>('table', tableSchema);

export default tableModel;
