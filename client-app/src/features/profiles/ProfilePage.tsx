import React from "react";
import { Grid } from "semantic-ui-react";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader></ProfileHeader>
                <ProfileContent></ProfileContent>
            </Grid.Column>
        </Grid>
    );
}
