import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/NavBar";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
// interface IState {
//   activities: IActivity[]
// }

const App = () => {
  const activityStore = useContext(ActivityStore); // import store
  // const [activities, setActivities] = useState<IActivity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
  //   null
  // );
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);
  // const [target, setTarget] = useState('');

  // create new activity and add it to activities array
  // const handleCreateActivity = (activity: IActivity) => {
  //   setSubmitting(true);
  //   agent.Activities.create(activity).then(() => {
  //     setActivities([...activities, activity]);
  //     setSelectedActivity(activity);
  //     setEditMode(false);
  //   }).then(() => setSubmitting(false));
  // }

  // make a new array except the modify one, add the modify one to the new array
  // const handleEditActivity = (activity: IActivity) => {
  //   setSubmitting(true);
  //   agent.Activities.update(activity).then(()=>{
  //     setActivities([...activities.filter(a => a.id !== activity.id), activity]);
  //     setSelectedActivity(activity);
  //     setEditMode(false);
  //   }).then(() => setSubmitting(false));
  // }

  // const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
  //   setSubmitting(true);
  //   setTarget(event.currentTarget.name);
  //   agent.Activities.delete(id).then(()=>{
  //     setActivities([...activities.filter(a => a.id !== id)]);
  //   }).then(() => setSubmitting(false));
  // }

  useEffect(() => {
    activityStore.loadActivities();
  },[activityStore]); //[] just run one time

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          // activities={activityStore.activities}
          //selectActivity={handleSelectActivity}
          //selectedActivity={selectedActivity} // selectedActivity! !means null is ok 
          //editMode={editMode}
          // setEditMode={setEditMode}
          // setSelectedActivity={setSelectedActivity}
          // createActivity={handleCreateActivity}
          // editActivity={handleEditActivity}
          // deleteActivity={handleDeleteActivity}
          // target={target}
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

export default observer(App);
