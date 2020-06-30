import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore"

// interface IProps {
//   // activities: IActivity[];
//   //selectActivity: (id: string) => void;
//   // setEditMode: (editMode: boolean) => void;
//   // setSelectedActivity: (activity: IActivity | null) => void;
//   // createActivity: (activity: IActivity) => void;
//   // editActivity: (activity: IActivity) => void;
//   deleteActivity: (
//     event: SyntheticEvent<HTMLButtonElement>,
//     id: string
//   ) => void;
//   target: string;
// }

//export const ActivityDashboard: React.FC<IProps> = (props) => {
// const ActivityDashboard: React.FC<IProps> = ({
  // activities,
  //selectActivity,
  // setEditMode,
  // setSelectedActivity,
  // createActivity,
  // editActivity,
  // deleteActivity,
  // target,
const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {editMode, selectedActivity} = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
        {/* <List>
          {props.activities.map((activity) => ( }
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List> */}
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {/* && means if null skip this */}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);