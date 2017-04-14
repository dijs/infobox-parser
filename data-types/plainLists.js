import getValue from '../util/getValue';

const listItemPrefixPattern = /^\*\s?/;
const plainListGlobalPattern = /\{\{f?p?P?l?a?i?n?t?list\s?\|([^\}\}]+)\}\}/g;
const plainListItemPattern = /\*\s*([^*}]+)/g;

export default {
  globalPattern: plainListGlobalPattern,
  parsePattern: plainListItemPattern,
  parse: listItems => {
    if (!listItems) {
      return [];
    }
    return listItems
      .map(item => item.replace(listItemPrefixPattern, '').trim())
      // .map(getValue)
      .filter(value => value && value.length);
  },
  variable: 'PLAIN_LIST',
  name: 'plainLists',
};
