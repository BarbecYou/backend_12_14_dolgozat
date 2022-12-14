import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { macskaDto } from './macskakDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listAllData(@Query('color') color = '') {
    let rows: any = [];
    if (color == '') {
      [rows] = await db.execute(
        'select suly, szem_szin from macskak order by suly',
      );
    } else {
      [rows] = await db.execute(
        'select suly, szem_szin from macskak where szem_szin = ? order by suly',
        [color],
      );
    }
    const [szemSzinek] = await db.execute(
      'select szem_szin from macskak group by szem_szin',
    );

    return {
      macskak: rows,
      szemSzinek: szemSzinek,
    };
  }

  @Get('/cats/new')
  @Render('newForm')
  showNewForm() {
    return {};
  }

  @Post('/cats/new')
  @Redirect()
  async addNewData(@Body() body: macskaDto) {
    await db.execute('insert into macskak (suly, szem_szin) values (?, ?)', [
      body.suly,
      body.szem_szin,
    ]);
    return {
      url: '/',
    };
  }
}
