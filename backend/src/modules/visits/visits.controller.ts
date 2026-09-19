import { Body, Controller, Post } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  create(@Body() body: CreateVisitDto) {
    return this.visitsService.create({
      personId: body.personId,
      address: body.address,
      how: body.how,
      found: body.found,
      visitedAt: body.visitedAt ? new Date(body.visitedAt) : undefined,
    });
  }
}
