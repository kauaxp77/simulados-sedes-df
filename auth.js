// auth.js
// Módulo de autenticação Firebase para o frontend.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updateCurrentUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function encryptCPF(cpf) {
  return btoa(cpf);
}

async function createUserProfile(uid, profile) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    name: profile.name,
    email: profile.email,
    cpfEncrypted: encryptCPF(profile.cpf),
    phone: profile.phone,
    role: profile.role,
    photoUrl: profile.photoUrl || null,
    plan: profile.plan || 'gratuito',
    paymentStatus: profile.paymentStatus || 'pending',
    status: 'active',
    permissions: profile.permissions || {},
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function registerUser(profile, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, profile.email, password);
  const user = userCredential.user;
  await sendEmailVerification(user);
  await createUserProfile(user.uid, profile);
  return user;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (!user.emailVerified) {
    await signOut(auth);
    throw new Error('Verifique seu e-mail antes de entrar.');
  }
  await updateDoc(doc(db, 'users', user.uid), {
    lastLogin: serverTimestamp()
  });
  return user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export function observeAuthState(onChange) {
  return onAuthStateChanged(auth, onChange);
}

export async function refreshToken() {
  const user = auth.currentUser;
  if (!user) return null;
  await user.getIdToken(true);
  return user;
}

export async function getUserProfile(uid) {
  const docRef = doc(db, 'users', uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function requireRole(role) {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  const token = await user.getIdTokenResult(true);
  if (token.claims.role !== role && token.claims.role !== 'admin') {
    throw new Error('Permissão negada');
  }
  return token.claims;
}

export async function getCurrentUserId() {
  return auth.currentUser ? auth.currentUser.uid : null;
}

export async function secureFetch(url, options = {}) {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : ''
    },
    credentials: 'include'
  });
}

export async function loadUserSimulados(uid) {
  const simuladosRef = collection(db, 'simulados');
  const q = query(simuladosRef, where('status', '==', 'published'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
