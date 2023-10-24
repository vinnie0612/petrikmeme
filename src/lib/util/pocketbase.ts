import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new PocketBase('https://pb.petrikreal.tech');

export const currentUser = writable(pb.authStore.model);

export const signIn = async () => {
  await pb.collection('users').authWithOAuth2({ provider: 'microsoft' });
};

export const signOut = async () => {
  await pb.authStore.clear();
};

pb.authStore.onChange((auth) => {
  console.log('authStore changed', auth);
  currentUser.set(pb.authStore.model);
});
