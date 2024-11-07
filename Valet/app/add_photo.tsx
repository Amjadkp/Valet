import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryStatus.status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhotoUri(photo.uri);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
      ) : (
        <Camera style={styles.camera} ref={ref => setCamera(ref)} />
      )}
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      {photoUri && (
        <TouchableOpacity style={styles.button} onPress={() => setPhotoUri(null)}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  previewImage: {
    width: '100%',
    height: '80%',
  },
});

export default CameraScreen;
