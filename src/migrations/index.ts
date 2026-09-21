import * as migration_20260920_162510_localize_content from './20260920_162510_localize_content';

export const migrations = [
  {
    up: migration_20260920_162510_localize_content.up,
    down: migration_20260920_162510_localize_content.down,
    name: '20260920_162510_localize_content'
  },
];
