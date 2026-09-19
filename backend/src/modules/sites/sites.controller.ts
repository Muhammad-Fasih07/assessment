import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { SitesService } from './sites.service';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get('search')
  search(@Query('q') q = '') {
    return this.sitesService.search(q);
  }

  @Post()
  create(@Body() body: CreateSiteDto) {
    return this.sitesService.create(body);
  }

  @Get(':address')
  getByAddress(@Param('address') address: string) {
    return this.sitesService.getByAddressOrFail(address);
  }
}
