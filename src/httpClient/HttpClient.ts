import axios,{AxiosInstance} from 'axios';


export default abstract class HttpClient {
  instance: AxiosInstance;

  constructor (baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }

}