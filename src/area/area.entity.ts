import { AreaStatus } from './area-status.enum';

export class Area {
  id: number;
  name: string;
  description?: string;
  status: AreaStatus;
}
