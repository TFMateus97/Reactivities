import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    //o total de colunas possível aqui são 16
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails></ActivityDetails>}
        {editMode && <ActivityForm></ActivityForm>}
      </Grid.Column>
    </Grid>
  );
});
