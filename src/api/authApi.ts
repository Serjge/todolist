import { AxiosResponse } from 'axios';

import { ResponseType } from './type';

import { instance } from 'api/config';
import { LoginParamsType, authType } from 'types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >('/auth/login', data);
  },
  me() {
    return instance.get<ResponseType<authType>>('/auth/me');
  },
  logout() {
    return instance.delete<ResponseType>('/auth/login');
  },
};
