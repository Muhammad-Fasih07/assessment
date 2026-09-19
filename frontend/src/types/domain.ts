export type Person = {
  _id: string;
  name: string;
  canPublish: boolean;
};

export type Site = {
  _id: string;
  address: string;
  title: string;
  html: string;
  authorId: string | { _id: string; name: string };
};

export type VisitHow =
  | 'typed'
  | 'link'
  | 'back'
  | 'forward'
  | 'history'
  | 'search';

export type Visit = {
  _id: string;
  personId: string;
  address: string;
  how: VisitHow;
  found: boolean;
  visitedAt: string;
};
