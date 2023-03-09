import { ApiClient } from './axiosClient';

const axios = ApiClient();

export async function getQbUri() {
  const url = process.env.BACK_URL + '/v1/intuit/authUri';
  const response = await axios.get(url);
  return response?.data;
}

export async function getQbTooken(
  code: string | string[],
  state: string | string[],
  realmId: string | string[]
): Promise<QbToken> {
  const url =
    process.env.BACK_URL +
    `/v1/intuit/integrations?code=${code}&state=${state}&realmId=${realmId}`;
  const response = await axios.get(url);
  return response?.data;
}

export async function getQbCompanyInfo() {
  const url = process.env.BACK_URL + `/v1/intuit/getCompanyInfo`;
  const response = await axios.get(url);
  return response?.data;
}

export async function saveCompanyData(body: PostCompanyBody) {
  const url = process.env.BACK_URL + `/v1/quickbooks/company`;
  const response = await axios.post(url, body);
  return response?.data;
}

export async function getQbCompany(user_id: string | null | undefined) {
  const url = process.env.BACK_URL + '/v1/quickbooks/company/' + user_id;
  const response = await axios.get(url);
  return response?.data;
}
