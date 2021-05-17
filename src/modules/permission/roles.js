export const listRoles = ['new', 'verified', 'impersonate', 'unauthorized'];

const base = [
  'base.create.own',
  'base.get.own',
  'base.search.own',
  'base.update.own',
  'base.delete.own',
];

const experience = [
  'experience.create.own',
  'experience.get.own',
  'experience.search.own',
  'experience.update.own',
  'experience.delete.own',
];

const activity = [
  'activity.create.own',
  'activity.get.own',
  'activity.search.own',
  'activity.update.own',
  'activity.delete.own',
];
const accommodation = [
  'accommodation.create.own',
  'accommodation.get.own',
  'accommodation.search.own',
  'accommodation.update.own',
  'accommodation.delete.own',
];

const attraction = [
  'attraction.create.own',
  'attraction.get.own',
  'attraction.search.own',
  'attraction.update.own',
  'attraction.delete.own',
];

const restaurant = [
  'restaurant.create.own',
  'restaurant.get.own',
  'restaurant.search.own',
  'restaurant.update.own',
  'restaurant.delete.own',
];

const client = [
  'client.create.own',
  'client.get.own',
  'client.search.own',
  'client.update.own',
  'client.delete.own',
];

const order = [
  'order.create.own',
  'order.get.own',
  'order.search.own',
  'order.update.own',
  'order.delete.own',
];

const service = [
  'service.create.own',
  'service.get.own',
  'service.search.own',
  'service.update.own',
  'service.delete.own',
];

const roles = {
  new: [
    'user.auth',
    'experience.get.own',
    'experience.search.own',
    'restaurant.get.own',
    'restaurant.search.own',
    'attraction.get.own',
    'attraction.search.own',
    'experience.get.own',
    'experience.search.own',
    'restaurant.get.own',
    'restaurant.search.own',
    'attraction.get.own',
    'attraction.search.own',
    'accommodation.get.own',
    'accommodation.search.own',
    'activity.get.own',
    'activity.search.own',
    'restaurant.get.own',
    'restaurant.search.own',
  ],
  unauthorized: [
    'experience.get.own',
    'experience.search.own',
    'restaurant.get.own',
    'restaurant.search.own',
    'attraction.get.own',
    'attraction.search.own',
    'accommodation.get.own',
    'accommodation.search.own',
    'activity.get.own',
    'activity.search.own',
    'restaurant.get.own',
    'restaurant.search.own',
  ],
  verified: [
    'user.auth',
    ...base,
    ...client,
    ...order,
    ...service,
    ...experience,
    ...accommodation,
    ...attraction,
    ...activity,
    ...restaurant,
  ],

  // impersonate: [
  //   // USER
  //   'user.search',
  //   'user.impersonate',
  //   'user.stats',
  // ],
};

export default roles;
