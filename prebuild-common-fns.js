const fs = require('fs');
const path = require('path');

/**
 * Get the config object used by the app.
 * @param configFilepath File path to config.ts where the config object is defined.
 * @returns Object containing the config.
 */
function getConfig(configFilepath) {
  // Join the relative file path with the current working directory to create an absolute path
  const absoluteConfigFilepath = path.join(__dirname, configFilepath);
  let config = null;

  try {
    // Read the contents of the config.ts file
    const configTS = fs.readFileSync(absoluteConfigFilepath, 'utf-8');

    // Extract the config object from the string
    let configContent = configTS.split('export const config')[1] || '';
    if (!configContent) {
      console.error('Unable to read config.ts file.');
      return null;
    }
    const c_start = configContent.indexOf('{');
    const c_end = configContent.lastIndexOf('}') + 1;
    configContent = 'module.exports = ' + configContent.slice(c_start, c_end);

    // Write the config object to a temporary file
    fs.writeFileSync(path.join(__dirname, 'src/tmp_config.js'), configContent);

    // Import the config object from the temporary file as javascript
    config = require(path.join(__dirname, 'src/tmp_config.js'));
  } catch (err) {
    console.error(err);
    return null;
  }

  try {
    // Delete the temporary config file
    fs.unlinkSync(path.join(__dirname, 'src/tmp_config.js'));
  } catch (e) {
    console.error(e);
  }
  return config;
}

async function fetchFromAPI(endpoint) {
  const res = await fetch(endpoint);
  if (res.ok) {
    return await res.json();
  } else {
    console.error(res);
    return null;
  }
}

/**
 * Given an object with nested objects in the property 'branchingKey',
 * returns a flattened array of the object. If 'requiredKey' is not
 * undefined, only objects that have a non-empty 'requiredKey' property
 * are included.
 */
function flattenObjectTree(data, branchingKey = 'children', requiredKey = undefined) {
  const dataWithoutChildren = (({ [branchingKey]: _, ...d }) => d)(data);
  let list = [];
  if (!requiredKey || (requiredKey && data[requiredKey])) {
    list = [dataWithoutChildren];
  }
  if (!data[branchingKey] && (!requiredKey || (requiredKey && data[requiredKey]))) {
    return list;
  }
  if (data[branchingKey] && data[branchingKey].length) {
    for (const child of data[branchingKey]) {
      list = list.concat(flattenObjectTree(child, branchingKey, requiredKey));
    }
  }
  return list;
}

/**
 * Get the translation of the phrase with the given id in the given locale.
 * The translation is fetched from the messages.<locale>.xlf files in the
 * given folder.
 * @returns The translation as a string or 'link' if unable to find the id
 * in the translation file.
 */
function getTranslation(folderPath, locale, id) {
  if (!id) {
    return 'link';
  }
  // Join the relative file path with the current working directory to create an absolute path
  const absoluteFilepath = path.join(__dirname, folderPath + 'messages.' + locale + '.xlf');

  try {
    // Read the contents of the .xlf file
    const xlf = fs.readFileSync(absoluteFilepath, 'utf-8');

    let start = xlf.indexOf('<unit id="' + id + '">');
    if (start < 0) {
      return 'link';
    }
    start = xlf.indexOf('<target>', start);
    if (start < 0) {
      return 'link';
    } else {
      start += 8;
    }
    const end = xlf.indexOf('</target>', start);
    if (end > -1) {
      return xlf.slice(start, end);
    }
    return 'link';
  } catch (err) {
    console.error(err);
    return 'link';
  }
}

/**
 * Export all functions in this file as a CommonJS module.
 */
module.exports = {
  getConfig,
  fetchFromAPI,
  flattenObjectTree,
  getTranslation
};
