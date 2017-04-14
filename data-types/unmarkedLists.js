const listItemPrefixPattern = /^\*\s*/;
const plainListGlobalPattern = /\n(\*\s*[^*|]+)+/g;
const plainListItemPattern = /\*\s*([^*|]+)/g;

export default {
  globalPattern: plainListGlobalPattern,
  parsePattern: plainListItemPattern,
  parse: listItems => {
    if (!listItems) {
      return [];
    }
    return listItems
      .map(item => item.replace(listItemPrefixPattern, '').trim())
      .filter(value => value && value.length);
  },
  variable: 'UNMARKED_LIST',
  name: 'unmarkedLists',
};
