import { ApiClient } from './axiosClient';

const baseURL = process.env.NEXT_PUBLIC_BACK_URL as string;
const axios = ApiClient(baseURL);

export async function getQbUri() {
  const url = '/v2/intuit/authUri';
  const response = await axios.get(url);
  return response?.data;
}

export async function getQbTooken(
  code: string | string[],
  state: string | string[],
  realmId: string | string[]
): Promise<QbToken> {
  const url = `/v2/intuit/integrations?code=${code}&state=${state}&realmId=${realmId}`;
  const response = await axios.get(url);
  return response?.data;
}

export async function getQbCompanyInfo() {
  const url = '/v2/intuit/getCompanyInfo';
  const response = await axios.get(url);
  return response?.data;
}

export async function saveCompanyData(body: PostCompanyBody) {
  const url = '/v2/quickbooks/company';
  const response = await axios.post(url, body);
  return response?.data;
}

export async function getQbCompany(user_id: string | null | undefined) {
  const url = '/v2/quickbooks/company/' + user_id;
  const response = await axios.get(url);
  console.log(response)
  return response?.data;
}

export async function setPnL(user_id: any, company_id: string) {
  const url = '/v2/quickbooks/setProfitAndLoss';
  const response = await axios.post(url, { user_id, company_id });
  return response?.data;
}

export async function getPnL(user_id: any) {
  const url = `/v2/quickbooks/getProfitAndLoss?user_id=${user_id}`;
  const response = await axios.get(url)
  return response?.data
}

export async function saveOneMapping(body: any) {
  const url = `/v2/quickbooks/mapping`
  const response = await axios.post(url, body)
  return response?.data
}

export async function saveTemplate(body: any) {
  const url = `/v2/quickbooks/myTemplates`
  const response = await axios.post(url, body)
  return response?.data
}

export async function getTemplates() {
  const url = `/v2/quickbooks/myTemplates`
  const response = await axios.get(url)
  return response?.data
}
