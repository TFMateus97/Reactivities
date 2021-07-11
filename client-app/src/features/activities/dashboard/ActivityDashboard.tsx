import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
  //especificando que está pegando activities de Props
  return (
    //o total de colunas possível aqui são 16
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities}></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {activities[0] && (
          <ActivityDetails activity={activities[0]}></ActivityDetails> //é uma forma de garantir que o componente só vai ser carregado depois que ele existir
        )}
        <ActivityForm></ActivityForm>
      </Grid.Column>
    </Grid>
  ); //Atualmente vai ficar "hard coded" sempre pegando o primeiro, será removido posteriormente
}
