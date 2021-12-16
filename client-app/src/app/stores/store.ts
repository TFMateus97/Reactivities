import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommomStore from "./commonStore";
import UserStore from "./UserStore";

interface Store {
    activityStore: ActivityStore;
    commomStore: CommomStore;
    userStore: UserStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commomStore: new CommomStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}