export declare class FirebaseService {
    constructor();
    sendNotification(token: string, title: string, body: string): Promise<string>;
}
