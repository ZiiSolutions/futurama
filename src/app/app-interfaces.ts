// API response schema for /info endpoint
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


