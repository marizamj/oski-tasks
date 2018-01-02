import marked from 'marked';

export const findAndParseLinks = string => {
  const matchedLinks = string.match(/(https?:\/\/.+?\s)|(https?:\/\/.+?$)/gi);

  let newString = string;

  if (matchedLinks && matchedLinks.length > 0) {
    matchedLinks.forEach(url => {
      newString = newString.replace(
        url,
        `<a target="_blank" href=${url.trim()}>${url.trim()}</a> `
      );
    });
  }

  return newString;
};

export const addTargetBlank = string =>
  string.replace(/<a href="/gi, '<a target="_blank" href="');

export const parseColors = string =>
  string
    .replace(/\(color:red\)/gi, '<span class="red">')
    .replace(/\(color:blue\)/gi, '<span class="blue">')
    .replace(/\(color:green\)/gi, '<span class="green">')
    .replace(/\(color:violet\)/gi, '<span class="violet">')
    .replace(/\(color:indigo\)/gi, '<span class="indigo">')
    .replace(/\(color:gray\)/gi, '<span class="gray">')
    .replace(/\(color:end\)/gi, '</span>');

export const getIDFromTitle = title => title.replace(/\s/g, '-').toLowerCase();

export const applyFormatting = (_string, types) => {
  const typesMap = {
    colors: parseColors,
    markdown: marked,
    targetBlank: addTargetBlank
  };

  let string = _string;

  return types.reduce((acc, type) => typesMap[type](acc), string);
};
