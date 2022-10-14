import { AxiosForIpadress } from "./Axios";

const GetIp = async () => {
  const response = await AxiosForIpadress.get();
  const foundIp = response.data.client_ip;
  return foundIp;
};

export default GetIp;
