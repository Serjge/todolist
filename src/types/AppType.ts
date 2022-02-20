import { RequestStatusType } from 'types';

export type AppType = {
  status: RequestStatusType;
  error: string | null;
};
