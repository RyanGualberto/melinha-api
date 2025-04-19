declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: 'admin' | 'user';
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }

  export interface Response {
    send: (data: object) => Response;
    setHeader: (key: string, value: string) => Response;
    sendFile: (path: string) => Response;
  }
}
