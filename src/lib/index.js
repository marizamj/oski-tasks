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

export const parseColors = string => {
  return string
    .replace(/\(color:red\)/gi, '<span class="red">')
    .replace(/\(color:blue\)/gi, '<span class="blue">')
    .replace(/\(color:green\)/gi, '<span class="green">')
    .replace(/\(color:violet\)/gi, '<span class="violet">')
    .replace(/\(color:indigo\)/gi, '<span class="indigo">')
    .replace(/\(color:gray\)/gi, '<span class="gray">')
    .replace(/\(color:end\)/gi, '</span>');
};

export const getIDFromTitle = title => title.replace(/\s/g, '-').toLowerCase();
