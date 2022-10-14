import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});

export const AxiosForIpadress = axios.create({
  // baseURL: "https://ip.seeip.org?format=jsonp&callback=getIP",
  baseURL: "https://worldtimeapi.org/api/ip",
  // This maybe need to be done in the backend as well
});

export const AxiosForJobSearch = axios.create({
  baseURL: "https://api.whatjobs.com/api/v1/jobs.json?publisher=3785&user_ip=100.8.240.174",
  // this will be excuted in the server side later on when requested by the user
});

export default Axios;
