import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('/data')
export class DataController {

constructor(private readonly dataService: DataService) {}

@Post('/add')
async addData(
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('age') age: number,
  ) {
    const generatedId = await this.dataService.addData(
      name,
      address,
      age,
    );
    return { id: generatedId };
  }

  @Get('/all')
  async getAllData() {
    const data = await this.dataService.getAllData();
    return data;
  }

  @Get(':id')
  getData(@Param('id') dataId: string) {
    return this.dataService.getSingleData(dataId);
  }

  @Patch('/update')
  async updateData(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('age') age: number,
  ) {
    await this.dataService.updateData(id, name, address, age);
    return null;
  }

  @Delete('/delete')
  async daleteData(@Body('id') dataId: string) {
      await this.dataService.deleteData(dataId);
      return null;
  }

}
