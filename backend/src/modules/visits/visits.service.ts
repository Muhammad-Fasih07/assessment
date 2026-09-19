import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument, VisitHow } from './schemas/visit.schema';

export type CreateVisitInput = {
  personId: string;
  address: string;
  how: VisitHow;
  found: boolean;
  visitedAt?: Date;
};

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name)
    private readonly visitModel: Model<VisitDocument>,
  ) {}

  create(input: CreateVisitInput) {
    return this.visitModel.create({
      personId: input.personId,
      address: input.address.toLowerCase().trim(),
      how: input.how,
      found: input.found,
      visitedAt: input.visitedAt ?? new Date(),
    });
  }

  findHistoryForPerson(personId: string, limit = 100) {
    return this.visitModel
      .find({ personId })
      .sort({ visitedAt: -1 })
      .limit(limit)
      .lean()
      .exec();
  }
}
