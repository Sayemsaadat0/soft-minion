import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

const axiousResuest = async (options: AxiosRequestConfig) => {
  const onSuucess = (res: AxiosResponse) => {
    return res.data;
  };

  const onError = (err: AxiosError) => {
    throw err.response?.data;
  };

  return axios(options).then(onSuucess).catch(onError);
};

export default axiousResuest;