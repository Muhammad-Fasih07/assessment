import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeopleService } from '../people/people.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { Site, SiteDocument } from './schemas/site.schema';

@Injectable()
export class SitesService {
  constructor(
    @InjectModel(Site.name)
    private readonly siteModel: Model<SiteDocument>,
    private readonly peopleService: PeopleService,
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
      .find({ $text: { $search: q } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .populate('authorId', 'name')
      .lean()
      .exec();
  }

  async create(dto: CreateSiteDto) {
    const address = dto.address.toLowerCase().trim();
    const author = await this.peopleService.findById(dto.authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const existing = await this.siteModel.findOne({ address }).lean().exec();
    if (existing) {
      throw new ConflictException(`Address "${address}" is already taken`);
    }

    const site = await this.siteModel.create({
      address,
      title: dto.title.trim(),
      html: dto.html,
      authorId: dto.authorId,
    });

    return this.siteModel
      .findById(site._id)
      .populate('authorId', 'name')
      .lean()
      .exec();
  }
}
