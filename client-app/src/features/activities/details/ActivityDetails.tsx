import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const {
        selectedActivity: activity,
        loadingInitial,
        loadActivity,
        clearSelectedActivity,
    } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
        return () => clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity]);

    if (loadingInitial || !activity)
        return <LoadingComponent></LoadingComponent>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader
                    activity={activity}
                ></ActivityDetailedHeader>
                <ActivityDetailedInfo
                    activity={activity}
                ></ActivityDetailedInfo>
                <ActivityDetailedChat
                    activityId={activity.id}
                ></ActivityDetailedChat>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar
                    activity={activity}
                ></ActivityDetailedSideBar>
            </Grid.Column>
        </Grid>
    );
});
