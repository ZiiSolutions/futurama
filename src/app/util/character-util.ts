import { CharacterName } from '../app-interfaces';

/**
 * Curation of common functions and extractions to reduce code duplication and promote re-use
 */

/**
 * Compose a custom alt text for an image using full name
 * @param characterName containing first, middle & last name
 * @returns string representation of custom all text
 */
export const composeCharacterImageAltText = (
  characterName: CharacterName
): string => `Image of ${composeCharacterName(characterName)}`;
/**
 * Compose full name
 * @param characterName containing first, middle & last name
 * @returns full name of the character
 */
export const composeCharacterName = (characterName: CharacterName): string => {
  const { first, middle, last } = characterName;
  // Character name can be an empty string which we need to remove
  // Another way is -->  `${first} ${middle} ${last}`;
  return [first, middle, last].filter((name) => name && name.length).join(' ');
};
