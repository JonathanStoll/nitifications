import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('notification recived', notification);
      const user = notification.request.content.data.userName;
      console.log('user', user);
    })
   
 const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('response recived', response);
    });
    return () => {

      subscription1.remove();
      subscription2.remove();
    }
  }, []);

 function scheduleNotification() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first Local Notification',
        body: 'a body of notificvation.',
        data: {
          userName: 'Jonathan',
          message: 'You have a reminder.',
        },
      },
      trigger: {
        seconds: 5,
      },
    });
  }
  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
      <StatusBar style="auto" />
    </View>
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
