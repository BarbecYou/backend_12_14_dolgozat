import { Injectable } from '@nestjs/common';
import db from './db';
import { macskaDto } from './macskakDto';

@Injectable()
export class AppService {
  async getAllData() {
    const [rows] = await db.execute('SELECT suly, szem_szin from macskak');
    return rows;
  }
}
