import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitsModule } from '../visits/visits.module';
import { Person, PersonSchema } from './schemas/person.schema';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    VisitsModule,
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService, MongooseModule],
})
export class PeopleModule {}
