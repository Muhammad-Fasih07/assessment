import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SiteDocument = HydratedDocument<Site>;

@Schema({ timestamps: true, collection: 'sites' })
export class Site {
  // e.g. tidepool.zz
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  address!: string;

  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true })
  html!: string;

  @Prop({ type: Types.ObjectId, ref: 'Person', required: true })
  authorId!: Types.ObjectId;
}

export const SiteSchema = SchemaFactory.createForClass(Site);

SiteSchema.index({ title: 'text', html: 'text' });
