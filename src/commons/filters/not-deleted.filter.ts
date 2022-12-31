import { FilterDef } from '@mikro-orm/core/typings';

export const NotDeleted: FilterDef = {
  name: 'notDeleted',
  cond: { deleted_at: null },
  default: true,
};
