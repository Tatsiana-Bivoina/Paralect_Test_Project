export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  reg_user_resumes_count: number;
  token_type: string;
  ttl: number;
}

export interface VacancyResponse {
  id: number;
  profession: string;
  firm_name: string;
  town_title: string;
  type_of_work_title: string;
  payment_to: number;
  payment_from: number;
  currency: string;
  isFavorite: boolean;
}

interface SubwayType {
  id: number;
  title: string;
  id_metro_line: number;
}

interface PositionType {
  id: number;
  title: string;
}

interface DirectorySectionType {
  id: number;
  title: string,
  positions: PositionType[];
}

export interface VacanciesResponseType {
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  date_pub_to: number;
  date_archived: number;
  date_published: number;
  address: null;
  payment: null;
  profession: string;
  work: string;
  metro: SubwayType[];
  currency: string;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  type_of_work: {
    id: number;
    title: string;
  };
  place_of_work: {
    id: number;
    title: string;
  };
  education: {
    id: number;
    title: string;
  };
  experience: {
    id: number;
    title: string;
  };
  maritalstatus: {
    id: number;
    title: string;
  };
  children: {
    id: number;
    title: string;
  };
  already_sent_on_vacancy: boolean;
  languages: string[];
  driving_licence: string[];
  catalogues: DirectorySectionType[];
  agency: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
    declension: string;
    genitive: string;
  };
  client_logo: string;
  age_from: number;
  age_to: number;
  gender: {
    id: number;
    title: string;
  };
  firm_name: string;
  firm_activity: string;
  link: string;
}

export interface VacanciesResponse {
  objects: VacanciesResponseType[];
  total: number;
}

interface CataloguePositionsType {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}

export interface CatalogueResponse {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: CataloguePositionsType[];
}

export interface Catalogue {
  value: string;
  label: string;
  key: number;
}
