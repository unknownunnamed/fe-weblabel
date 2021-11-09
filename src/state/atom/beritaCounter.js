import { atom } from "recoil";

const beritaCounter = atom({
    key: 'beritaCounter',
    default: 0,
});

export default beritaCounter;