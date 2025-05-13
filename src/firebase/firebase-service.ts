// firebase/firebase.service.ts
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          type: 'service_account',
          project_id: 'melinhaacai',
          private_key_id: '78b6576669ffc7cd3ae6ba96d0c5a5f98ecd1c92',
          private_key: process.env.PRIVATE_KEY,
          client_email:
            'firebase-adminsdk-fbsvc@melinhaacai.iam.gserviceaccount.com',
          client_id: '118118237701040901320',
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url:
            'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40melinhaacai.iam.gserviceaccount.com',
          universe_domain: 'googleapis.com',
        } as admin.ServiceAccount),
      });
    }
  }

  async sendNotification(token: string, title: string, body: string) {
    return await admin.messaging().send({
      token,
      notification: { title, body },
    });
  }
}
