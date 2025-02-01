import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../borrowhood-95840-firebase-adminsdk-fbsvc-f0f1588258.json';


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const db = getFirestore();
