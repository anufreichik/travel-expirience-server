export const listRoles = ['new', 'businessOwner', 'impersonate'];

const base = [
  'base.create.own',
  'base.get.own',
  'base.search.own',
  'base.update.own',
  'base.delete.own',
];

const roles = {
  new: ['user.auth', ...base],

  admin: [
    // USER
    'user.auth',
    'user.get.all',
    'user.delete.any',
    'user.update.any',
    'user.search',
    'user.impersonate',
    'user.stats',

    // EXAMPLE
    ...base,
  ],

  // impersonate: [
  //   // USER
  //   'user.search',
  //   'user.impersonate',
  //   'user.stats',
  // ],
};

export default roles;
