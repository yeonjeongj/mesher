import { atom } from 'recoil';

export const openModalAtom = atom({
  key: 'openModal',
  default: false,
});

export const modalTypeAtom = atom({
  key: 'modalType',
  default: '',
});
