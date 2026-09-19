export type SeedPerson = {
  name: string;
  canPublish: boolean;
};

export type SeedSite = {
  address: string;
  title: string;
  author: string;
  html: string;
};

export type SeedVisit = {
  person: string;
  address: string;
  how: 'typed' | 'link' | 'back' | 'forward' | 'history' | 'search';
  found: boolean;
  minutesAgo: number;
};

export const PEOPLE: SeedPerson[] = [
  { name: 'Mira', canPublish: true },
  { name: 'Jonah', canPublish: true },
  { name: 'Elise', canPublish: false },
  { name: 'Ren', canPublish: false },
  { name: 'Cass', canPublish: false },
];

export const SITES: SeedSite[] = [
  {
    address: 'tidepool.zz',
    title: 'Tidepool Notes',
    author: 'Mira',
    html: `
      <h1>Tidepool Notes</h1>
      <p>The water here keeps a ledger. Every evening the shoreline rearranges itself and leaves a short sentence in salt.</p>
      <p>I walk the same loop most nights. Sometimes I end up at <a href="glassharbor.zz">Glass Harbor</a>. Sometimes I follow a rumor to <a href="mossindex.zz">the Moss Index</a>.</p>
      <p>There is a dead trail people still share: <a href="nowhere.zz">nowhere.zz</a>. I tried it once. Nothing answered.</p>
    `,
  },
  {
    address: 'glassharbor.zz',
    title: 'Glass Harbor',
    author: 'Mira',
    html: `
      <h1>Glass Harbor</h1>
      <p>Boats here are mostly memory. The docks still creak like they have somewhere to go.</p>
      <p>If you came from <a href="tidepool.zz">Tidepool</a>, keep going east toward <a href="paperdock.zz">Paper Dock</a>. Jonah keeps a kiln inland at <a href="quietkiln.zz">Quiet Kiln</a>.</p>
      <p>Someone left a note about <a href="ghost.zz">ghost.zz</a>. Looks fake.</p>
    `,
  },
  {
    address: 'quietkiln.zz',
    title: 'Quiet Kiln',
    author: 'Jonah',
    html: `
      <h1>Quiet Kiln</h1>
      <p>Clay remembers heat longer than people remember promises. I fire bowls until the glaze starts telling stories.</p>
      <p>Related pages: <a href="redthread.zz">Red Thread</a>, <a href="lantern.zz">Lantern Yard</a>, and Mira's <a href="inkwell.zz">Inkwell</a>.</p>
    `,
  },
  {
    address: 'redthread.zz',
    title: 'Red Thread',
    author: 'Jonah',
    html: `
      <h1>Red Thread</h1>
      <p>I keep a single spool of red thread on the bench. Every project that matters gets a little length of it.</p>
      <p>From here you can walk to <a href="signalgarden.zz">Signal Garden</a> or duck back to <a href="quietkiln.zz">the kiln</a>. Cass swears <a href="missing.zz">missing.zz</a> used to load.</p>
    `,
  },
  {
    address: 'lantern.zz',
    title: 'Lantern Yard',
    author: 'Jonah',
    html: `
      <h1>Lantern Yard</h1>
      <p>At dusk the yard fills with borrowed light. None of the lanterns match. That is the point.</p>
      <p>See also <a href="windstair.zz">Wind Stair</a> and <a href="tidepool.zz">Tidepool Notes</a>.</p>
    `,
  },
  {
    address: 'mossindex.zz',
    title: 'The Moss Index',
    author: 'Mira',
    html: `
      <h1>The Moss Index</h1>
      <p>A soft catalog of green things that grow where maps give up. Entry 14 is a stairwell. Entry 27 is a rumor.</p>
      <p>Jump to <a href="inkwell.zz">Inkwell</a>, <a href="paperdock.zz">Paper Dock</a>, or <a href="signalgarden.zz">Signal Garden</a>.</p>
    `,
  },
  {
    address: 'signalgarden.zz',
    title: 'Signal Garden',
    author: 'Jonah',
    html: `
      <h1>Signal Garden</h1>
      <p>Antennae disguised as sunflowers. On clear nights you can hear distant pages turn.</p>
      <p>Neighbors: <a href="redthread.zz">Red Thread</a>, <a href="lantern.zz">Lantern Yard</a>, <a href="glassharbor.zz">Glass Harbor</a>.</p>
    `,
  },
  {
    address: 'paperdock.zz',
    title: 'Paper Dock',
    author: 'Mira',
    html: `
      <h1>Paper Dock</h1>
      <p>Letters arrive folded into boats. Most of them are unfinished. A few are brave.</p>
      <p>From the dock: <a href="tidepool.zz">Tidepool</a>, <a href="mossindex.zz">Moss Index</a>, <a href="windstair.zz">Wind Stair</a>.</p>
    `,
  },
  {
    address: 'windstair.zz',
    title: 'Wind Stair',
    author: 'Jonah',
    html: `
      <h1>Wind Stair</h1>
      <p>A staircase with no building attached. The wind uses it more than people do.</p>
      <p>Continue to <a href="lantern.zz">Lantern Yard</a> or return to <a href="quietkiln.zz">Quiet Kiln</a>. Avoid <a href="nowhere.zz">nowhere.zz</a>.</p>
    `,
  },
  {
    address: 'inkwell.zz',
    title: 'Inkwell',
    author: 'Mira',
    html: `
      <h1>Inkwell</h1>
      <p>Black water, patient pens, and a desk that has outlived three owners. This is where pages start.</p>
      <p>Linked: <a href="mossindex.zz">Moss Index</a>, <a href="paperdock.zz">Paper Dock</a>, <a href="quietkiln.zz">Quiet Kiln</a>.</p>
    `,
  },
];

// about an hour of browsing, fixed offsets so seed stays the same
export const VISITS: SeedVisit[] = [
  // Cass wandered almost everywhere
  { person: 'Cass', address: 'tidepool.zz', how: 'typed', found: true, minutesAgo: 58 },
  { person: 'Cass', address: 'glassharbor.zz', how: 'link', found: true, minutesAgo: 55 },
  { person: 'Cass', address: 'paperdock.zz', how: 'link', found: true, minutesAgo: 52 },
  { person: 'Cass', address: 'mossindex.zz', how: 'link', found: true, minutesAgo: 49 },
  { person: 'Cass', address: 'inkwell.zz', how: 'link', found: true, minutesAgo: 46 },
  { person: 'Cass', address: 'quietkiln.zz', how: 'link', found: true, minutesAgo: 43 },
  { person: 'Cass', address: 'redthread.zz', how: 'link', found: true, minutesAgo: 40 },
  { person: 'Cass', address: 'signalgarden.zz', how: 'link', found: true, minutesAgo: 37 },
  { person: 'Cass', address: 'lantern.zz', how: 'link', found: true, minutesAgo: 34 },
  { person: 'Cass', address: 'windstair.zz', how: 'link', found: true, minutesAgo: 31 },
  { person: 'Cass', address: 'nowhere.zz', how: 'link', found: false, minutesAgo: 28 },
  { person: 'Cass', address: 'windstair.zz', how: 'back', found: true, minutesAgo: 27 },
  { person: 'Cass', address: 'inkwell.zz', how: 'search', found: true, minutesAgo: 20 },

  // Elise: one long trail + a repeat
  { person: 'Elise', address: 'quietkiln.zz', how: 'typed', found: true, minutesAgo: 50 },
  { person: 'Elise', address: 'redthread.zz', how: 'link', found: true, minutesAgo: 47 },
  { person: 'Elise', address: 'signalgarden.zz', how: 'link', found: true, minutesAgo: 44 },
  { person: 'Elise', address: 'glassharbor.zz', how: 'link', found: true, minutesAgo: 41 },
  { person: 'Elise', address: 'tidepool.zz', how: 'link', found: true, minutesAgo: 38 },
  { person: 'Elise', address: 'glassharbor.zz', how: 'back', found: true, minutesAgo: 36 },
  { person: 'Elise', address: 'tidepool.zz', how: 'forward', found: true, minutesAgo: 35 },
  { person: 'Elise', address: 'tidepool.zz', how: 'typed', found: true, minutesAgo: 12 },

  // Ren: shorter trail, dead link, history jump
  { person: 'Ren', address: 'mossindex.zz', how: 'typed', found: true, minutesAgo: 33 },
  { person: 'Ren', address: 'inkwell.zz', how: 'link', found: true, minutesAgo: 30 },
  { person: 'Ren', address: 'ghost.zz', how: 'typed', found: false, minutesAgo: 25 },
  { person: 'Ren', address: 'lantern.zz', how: 'search', found: true, minutesAgo: 18 },
  { person: 'Ren', address: 'mossindex.zz', how: 'history', found: true, minutesAgo: 10 },

  // Mira publishing / checking her own pages
  { person: 'Mira', address: 'tidepool.zz', how: 'typed', found: true, minutesAgo: 22 },
  { person: 'Mira', address: 'inkwell.zz', how: 'typed', found: true, minutesAgo: 15 },
  { person: 'Mira', address: 'missing.zz', how: 'typed', found: false, minutesAgo: 8 },

  // Jonah
  { person: 'Jonah', address: 'quietkiln.zz', how: 'typed', found: true, minutesAgo: 26 },
  { person: 'Jonah', address: 'redthread.zz', how: 'link', found: true, minutesAgo: 24 },
  { person: 'Jonah', address: 'lantern.zz', how: 'link', found: true, minutesAgo: 16 },
  { person: 'Jonah', address: 'windstair.zz', how: 'link', found: true, minutesAgo: 5 },
];
