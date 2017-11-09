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

export const getIDFromTitle = title => title.replace(/\s/g, '-').toLowerCase();
