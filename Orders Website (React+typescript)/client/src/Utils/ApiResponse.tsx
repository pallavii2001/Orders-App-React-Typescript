import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:3005/';

interface ApiResponseOptions {
  method: string;
  url: string;
  params?: any;
  data?: any;
  headers?: any;
}

const ApiResponse = async (options: ApiResponseOptions) => {
  try {
    const { method, url, params, data, headers } = options;
    
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      params,
      data,
      headers
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

export default ApiResponse;
