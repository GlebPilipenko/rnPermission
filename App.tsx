import React, { useCallback, useEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";

const CAMERA_KEY: any = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
});

const App = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isCameraGranted, setIsCameraGranted] = useState(false);

  const handleStatusDenied = async () => {
    const requestedResponse = await request(CAMERA_KEY);
    console.log(2, requestedResponse);

    requestedResponse === RESULTS.GRANTED
      ? setIsCameraGranted(true)
      : setIsCameraGranted(false);
  };

  const handleCameraPermission = useCallback(async () => {
    const checkedResponse = await check(CAMERA_KEY);
    console.log(1, checkedResponse);

    if (isClicked && checkedResponse === RESULTS.BLOCKED) {
      console.log(isClicked);
      return openSettings().catch(() => Alert.alert('Open settings'));
    }

    if (checkedResponse === RESULTS.GRANTED) {
      return setIsCameraGranted(true);
    }

    await handleStatusDenied();
  }, [isClicked]);

  const onPress = () => setIsClicked(true);

  useEffect(() => {
    (async () => await handleCameraPermission())();
  }, [isClicked, handleCameraPermission]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
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
