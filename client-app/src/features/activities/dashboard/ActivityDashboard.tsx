import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined; //como no App.tsc foi espeficiado que pode ser um tipo Activity ou Undefined, todos os componentes que utilizarem essa propriedade precisam declara ela como sendo do mesmo tipo (Activity | undefined)
  selectActivity: (id: string) => void; //como é uma função, precisa especificar o tipo de retorno
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity,
}: Props) {
  //especificando que está pegando activities de Props
  return (
    //o total de colunas possível aqui são 16
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          ></ActivityDetails> //é uma forma de garantir que o componente só vai ser carregado depois que ele existir
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
          ></ActivityForm>
        )}
      </Grid.Column>
    </Grid>
  ); //Atualmente vai ficar "hard coded" sempre pegando o primeiro, será removido posteriormente
}
