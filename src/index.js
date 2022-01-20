/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/

const findIndex = (str) => {
  const startIndex = str.indexOf('<');
  const closeStartIndex = str.indexOf('</');
  const endIndex = str.indexOf('>');
  const closeEndIndex = str.indexOf('/>');
  const tempString = str.slice(startIndex + 1);
  const nextStartIndex = tempString.indexOf('<');
  return [startIndex, closeStartIndex, endIndex, closeEndIndex, nextStartIndex];
};

const addValidate = (str, allTags) => {
  const isEmptyStr = str === '';
  const isDuplicate = allTags.has(str);
  return !(isEmptyStr || isDuplicate);
};

const removeValidate = (str, tags) => {
  const isEmptyStr = str === '';
  const validation = tags[tags.length - 1] !== str;
  return !(isEmptyStr || validation);
};

exports.isValidXML = (xmlString) => {
  xmlString = xmlString.trim();
  if (xmlString.length === 0 || xmlString[0] !== '<') {
    return false;
  }

  const allTags = new Set();
  const tags = [];

  while (xmlString.indexOf('<') !== -1) {
    const [startIndex, closeStartIndex, endIndex, closeEndIndex, nextStartIndex] = findIndex(xmlString);

    const isTagsDeep = tags.length > 2;
    const startError = nextStartIndex !== -1 && nextStartIndex < endIndex;

    if (isTagsDeep || startError) return false;

    // </
    if (startIndex === closeStartIndex) {
      // </a/>
      if (endIndex - 1 === closeEndIndex) return false;

      // </a>
      if (endIndex !== -1) {
        const str = xmlString.slice(closeStartIndex + 2, endIndex).trim();
        if (!removeValidate(str, tags)) return false;
        tags.pop();
      }
    }

    // <
    // <a/>
    else if (endIndex - 1 === closeEndIndex) {
      const str = xmlString.slice(startIndex + 1, closeEndIndex).trim();
      if (!addValidate(str, allTags)) return false;
      allTags.add(str);
    }

    // <>
    else {
      const str = xmlString.slice(startIndex + 1, endIndex).trim();
      if (!addValidate(str, allTags)) return false;
      allTags.add(str);
      tags.push(str);
    }

    xmlString = xmlString.slice(endIndex + 1);
  }

  if (tags.length !== 0) return false;
  return true;
};
