import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VisitDocument = HydratedDocument<Visit>;

export enum VisitHow {
  Typed = 'typed',
  Link = 'link',
  Back = 'back',
  Forward = 'forward',
  History = 'history',
  Search = 'search',
}

@Schema({ timestamps: true, collection: 'visits' })
export class Visit {
  @Prop({ type: Types.ObjectId, ref: 'Person', required: true, index: true })
  personId!: Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  address!: string;

  @Prop({ required: true, enum: VisitHow })
  how!: VisitHow;

  // false = dead link / missing address
  @Prop({ default: false })
  found!: boolean;

  @Prop({ required: true, default: () => new Date() })
  visitedAt!: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);

VisitSchema.index({ personId: 1, visitedAt: -1 });
