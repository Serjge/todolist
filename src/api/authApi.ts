import { AxiosResponse } from 'axios';

import { ResponseType } from './type';

import { instance } from 'api/config';
import { pathApi } from 'const';
import { LoginParamsType, authType } from 'types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >(pathApi.login(), data);
  },
  me() {
    return instance.get<ResponseType<authType>>(pathApi.me());
  },
  logout() {
    return instance.delete<ResponseType>(pathApi.login());
  },
};
