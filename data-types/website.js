const websiteGlobalPattern = /\[(https?):\/\/((?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\s+([\w\s]+)\]/g;
const websitePattern = /\[(https?):\/\/((?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\s+([\w\s]+)\]/;

export default {
  globalPattern: websiteGlobalPattern,
  parsePattern: websitePattern,
  parse: results => {
    const [, protocol, hostname, path, title] = results;
    return {
      protocol,
      hostname,
      path,
      title,
      url: `${protocol}://${hostname}${path}`
    };
  },
  variable: 'WEBSITE',
  name: 'websites',
};
