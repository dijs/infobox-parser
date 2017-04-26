import getValue from '../util/getValue';

const listItemPrefixPattern = /^\|\s?/;
const unbulletedListGlobalPattern = /\{\{(?:unbulleted list|ubl|ubt|ublist|unbullet)\s?\|([^\}\}]+)\}\}/g;
const unbulletedListItemPattern = /\|\s*([^|}]+)/g;

export default {
  globalPattern: unbulletedListGlobalPattern,
  parsePattern: unbulletedListItemPattern,
  parse: listItems => {
    if (!listItems) {
      return [];
    }
    return listItems
      .map(item => item.replace(listItemPrefixPattern, '').trim())
      .filter(value => value && value.length);
  },
  variable: 'UNBULLETED_LIST',
  name: 'unbulletedLists',
};
