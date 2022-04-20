import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const App = () => {
  const [isCameraGranted, setIsCameraGranted] = useState(false);

  const handleCameraPermission = async () => {
    const checkedResponse = await check(PERMISSIONS.IOS.CAMERA);

    if (checkedResponse === RESULTS.GRANTED) {
      console.log(1);
      setIsCameraGranted(true);
    } else if (checkedResponse === RESULTS.DENIED) {
      const res2 = await request(PERMISSIONS.IOS.CAMERA);
      console.log(2);
      console.log(res2);
      res2 === RESULTS.GRANTED
        ? setIsCameraGranted(true)
        : setIsCameraGranted(false);
    }
  };

  useEffect(() => {
    console.log('u');
    (async () => await handleCameraPermission())();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Click Me</Text>
        </TouchableOpacity>
      </View>

      {isCameraGranted ? (
        <Text>Camera Granted! Display in-app camera...</Text>
      ) : (
        <Text>Camera Disallowed</Text>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonContainer: {
    width: 200,
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
