import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

// interface IState {
//   activities: IActivity[]
// }

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  // create new activity and add it to activities array
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  // make a new array except the modify one, add the modify one to the new array
  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      });
  }, []); //[] just run one time

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity} // selectedActivity! !means null is ok 
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

// Class component
// class App extends Component<{}, IState> {

//   readonly state: IState = {
//     activities: []
//   }

//   componentDidMount() {
//     axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response) => {
//       this.setState({
//         activities: response.data
//       })
//     })
//   }
//   render() {
//     return (
//       <div>
//         <Header as='h2'>
//           <Icon name='users' />
//           <Header.Content>Reactivities</Header.Content>
//         </Header>
//         <List>
//         {this.state.activities.map((activity) => (
//              <List.Item key={activity.id}>{activity.title}</List.Item>
//             ))}
//         </List>
//       </div>
//     );
//   }
// }

export default App;
