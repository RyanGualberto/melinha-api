import { User } from '@prisma/client';

declare namespace Express {
  export interface Request {
    user?: User;
  }

  export interface Response {
    send: (data: object) => Response;
    setHeader: (key: string, value: string) => Response;
    sendFile: (path: string) => Response;
  }
}
