import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity } = activityStore;

  if (!activity) return <LoadingComponent></LoadingComponent>;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description} </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            onClick={() => activityStore.openForm(activity.id)}
            color="blue"
            content="Edit"
          ></Button>
          <Button
            basic
            onClick={activityStore.cancelSelectedActivity}
            color="grey"
            content="Cancel"
          ></Button>
          {/* Como essa função nao tem parametros, nao se utiliza a arrowfunction, caso utilize, não vai funcionarx  */}
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
