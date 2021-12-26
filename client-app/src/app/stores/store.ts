import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommomStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./ProfileStore";
import UserStore from "./UserStore";

interface Store {
    activityStore: ActivityStore;
    commomStore: CommomStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commomStore: new CommomStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
