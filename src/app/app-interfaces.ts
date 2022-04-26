// API response schema derieved from /info endpoint
export interface InfoDetail {
  synopsis: string;
  yearsAired: string;
  creators: InfoCreators[];
  id: number;
}

export interface InfoCreators {
  name: string;
  url: string;
}

// API response schema derieved from /characters endpoint
export interface CharacterDetail {
  name: CharacterName;
  images: CharacterImage;
  gender: string;
  species: string;
  homePlanet: string;
  occupation: string;
  sayings: string[];
  id: number;
  age: string;
}

export interface CharacterName {
  first: string;
  middle: string;
  last: string;
}

export interface CharacterImage {
  ' head-shot': string;
  main: string;
}
