interface QbToken {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
  x_refresh_token_expires_in: string;
}

interface PostCompanyBody {
  company_id: string;
  company_name: string | null | undefined;
  company_addr: object | null | undefined;
  country?: string | null | undefined;
  email: string | null | undefined;
  legal_name: string;
  legal_addr?: object;
  name_value?: object[] | null | undefined;
  user_id: string | null | undefined;
  qb_token: QbToken;
  realmId: string | string[];
  is_active: boolean;
}

interface CompanyAddr {
  Id: string;
  Line1?: string;
  City?: string;
  CountrySubDivisionCode?: string;
  PostalCode?: string;
  Lat?: string;
  Long?: string;
}

interface CustomerCommunicationAddr {
  Id: string;
  Line1?: string;
  City?: string;
  CountrySubDivisionCode?: string;
  PostalCode?: string;
  Lat?: string;
  Long?: string;
}

interface LegalAddr {
  Id: string;
  Line1?: string;
  City?: string;
  CountrySubDivisionCode?: string;
  PostalCode?: string;
  Lat?: string;
  Long?: string;
}

interface CustomerCommunicationEmailAddr {
  Address?: string;
}

interface CompanyInfo {
  CompanyName: string;
  LegalName: string;
  CompanyAddr?: CompanyAddr;
  CustomerCommunicationAddr?: CustomerCommunicationAddr;
  LegalAddr: LegalAddr;
  CustomerCommunicationEmailAddr?: CustomerCommunicationEmailAddr;
  PrimaryPhone?: object;
  CompanyStartDate?: string;
  FiscalYearStartMonth?: string;
  Country?: string;
  Email?: { Address: string };
  WebAddr?: object;
  SupportedLanguages?: string;
  NameValue?: { Name: string; Value: string }[];
  domain?: string;
  sparse?: boolean;
  Id: string;
  SyncToken: string;
  MetaData: {
    CreateTime: string;
    LastUpdatedTime: stirng;
  };
}
