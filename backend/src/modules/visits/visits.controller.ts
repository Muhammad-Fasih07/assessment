import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitsService } from './visits.service';

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post('visits')
  create(@Body() body: CreateVisitDto) {
    return this.visitsService.create({
      personId: body.personId,
      address: body.address,
      how: body.how,
      found: body.found,
      visitedAt: body.visitedAt ? new Date(body.visitedAt) : undefined,
    });
  }

  @Get('people/:personId/history')
  history(
    @Param('personId') personId: string,
    @Query('limit') limit?: string,
  ) {
    const parsed = limit ? Number(limit) : 100;
    return this.visitsService.findHistoryForPerson(
      personId,
      Number.isFinite(parsed) ? parsed : 100,
    );
  }
}
