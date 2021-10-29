import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommomStore from "./commonStore";

interface Store {
    activityStore: ActivityStore;
    commomStore: CommomStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commomStore: new CommomStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}