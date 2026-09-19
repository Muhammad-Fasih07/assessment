import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from './schemas/site.schema';

@Injectable()
export class SitesService {
  constructor(
    @InjectModel(Site.name)
    private readonly siteModel: Model<SiteDocument>,
  ) {}

  findByAddress(address: string) {
    return this.siteModel
      .findOne({ address: address.toLowerCase().trim() })
      .populate('authorId', 'name')
      .lean()
      .exec();
  }

  async getByAddressOrFail(address: string) {
    const site = await this.findByAddress(address);
    if (!site) {
      throw new NotFoundException(`No site at address "${address}"`);
    }
    return site;
  }

  search(query: string) {
    const q = query.trim();
    if (!q) {
      return [];
    }

    return this.siteModel
      .find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' } },
      )
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .populate('authorId', 'name')
      .lean()
      .exec();
  }
}
