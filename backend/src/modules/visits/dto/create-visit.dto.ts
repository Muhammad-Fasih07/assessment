import { IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';
import { VisitHow } from '../schemas/visit.schema';

export class CreateVisitDto {
  @IsMongoId()
  personId!: string;

  @IsString()
  @MinLength(1)
  address!: string;

  @IsEnum(VisitHow)
  how!: VisitHow;

  @IsBoolean()
  found!: boolean;

  @IsOptional()
  visitedAt?: string;
}
