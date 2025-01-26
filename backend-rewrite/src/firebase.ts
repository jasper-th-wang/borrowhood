import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('../borrowhood-95840-firebase-adminsdk-fbsvc-f0f1588258.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = getFirestore();
