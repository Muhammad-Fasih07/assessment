import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { VisitsService } from '../visits/visits.service';

@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly visitsService: VisitsService,
  ) {}

  @Get()
  list() {
    return this.peopleService.findAll();
  }

  @Get(':id/history')
  history(@Param('id') id: string, @Query('limit') limit?: string) {
    const parsed = limit ? Number(limit) : 100;
    return this.visitsService.findHistoryForPerson(
      id,
      Number.isFinite(parsed) ? parsed : 100,
    );
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const person = await this.peopleService.findById(id);
    if (!person) {
      throw new NotFoundException(`Person ${id} not found`);
    }
    return person;
  }
}
