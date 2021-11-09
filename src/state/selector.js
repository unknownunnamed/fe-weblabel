import { selector } from "recoil";
import services from "../process/services";
import atom from "./index";

const getUserLabel = selector({
    key: "getUserLabel",
    get: async ({ get }) => {
        get(atom.beritaCounter);
        const data = await services.getUserLabel();
        return data.data.data;
    },
});

export default getUserLabel;