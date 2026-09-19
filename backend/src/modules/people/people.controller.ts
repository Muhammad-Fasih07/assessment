import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  list() {
    return this.peopleService.findAll();
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
