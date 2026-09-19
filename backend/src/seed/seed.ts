import 'dotenv/config';
import mongoose, { Schema } from 'mongoose';
import { PEOPLE, SITES, VISITS } from './data';

const PersonSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    canPublish: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'people' },
);

const SiteSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: true, trim: true },
    html: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
  },
  { timestamps: true, collection: 'sites' },
);

SiteSchema.index({ title: 'text', html: 'text' });

const VisitSchema = new Schema(
  {
    personId: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    address: { type: String, required: true, lowercase: true, trim: true },
    how: {
      type: String,
      required: true,
      enum: ['typed', 'link', 'back', 'forward', 'history', 'search'],
    },
    found: { type: Boolean, default: false },
    visitedAt: { type: Date, required: true },
  },
  { timestamps: true, collection: 'visits' },
);

async function seed() {
  const uri =
    process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/small-web';

  await mongoose.connect(uri);

  const Person = mongoose.model('Person', PersonSchema);
  const Site = mongoose.model('Site', SiteSchema);
  const Visit = mongoose.model('Visit', VisitSchema);

  await Promise.all([
    Person.deleteMany({}),
    Site.deleteMany({}),
    Visit.deleteMany({}),
  ]);

  const people = await Person.insertMany(PEOPLE);
  const byName = Object.fromEntries(people.map((p) => [p.name, p]));

  const sites = await Site.insertMany(
    SITES.map((s) => ({
      address: s.address,
      title: s.title,
      html: s.html.trim(),
      authorId: byName[s.author]._id,
    })),
  );

  const now = Date.now();
  await Visit.insertMany(
    VISITS.map((v) => ({
      personId: byName[v.person]._id,
      address: v.address,
      how: v.how,
      found: v.found,
      visitedAt: new Date(now - v.minutesAgo * 60_000),
    })),
  );

  console.log(
    `seeded ${people.length} people, ${sites.length} sites, ${VISITS.length} visits`,
  );

  await mongoose.disconnect();
}

seed().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
