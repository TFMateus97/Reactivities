import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default observer(function ActivityDashboard({
  activities,
  deleteActivity,
  submitting,
}: Props) {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    //o total de colunas possível aqui são 16
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails></ActivityDetails>}
        {editMode && <ActivityForm></ActivityForm>}
      </Grid.Column>
    </Grid>
  );
});
