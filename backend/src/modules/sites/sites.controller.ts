import { Controller, Get, Param, Query } from '@nestjs/common';
import { SitesService } from './sites.service';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get('search')
  search(@Query('q') q = '') {
    return this.sitesService.search(q);
  }

  @Get(':address')
  getByAddress(@Param('address') address: string) {
    return this.sitesService.getByAddressOrFail(address);
  }
}
