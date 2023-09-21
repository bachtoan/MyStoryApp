import { StyleSheet, Text, View} from 'react-native';
import StackScreen from './stacks_screen/StackScreen';



export default function App() {

  return (
    
    <StackScreen></StackScreen> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
