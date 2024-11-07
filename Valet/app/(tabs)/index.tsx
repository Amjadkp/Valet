// import { View, StyleSheet, Platform } from 'react-native';
// import Button from '@/components/Button';

// import { useCameraPermissions } from 'expo-camera';

// export default function HomeScreen() {
//   const [permission, requestPermission] =useCameraPermissions();
//   return (
  
//     <View style={styles.container}>
//       <View style={styles.footerContainer}>
//         <Button label="ADD" />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//   },
//   footerContainer: {
//     flex: 1 / 3,
//     alignItems: 'center',
//   },
// });

///


// import React, { useState } from 'react';
// import { View, StyleSheet, Platform, Modal } from 'react-native';
// import Button from '@/components/Button';
// import QRCodeScanner from 'react-native-qrcode-scanner';

// export default function HomeScreen() {
//   const [isScannerOpen, setScannerOpen] = useState(false);

//   const handleScan = (e) => {
//     // Handle the scanned data here
//     console.log("Scanned QR Code:", e.data);
//     setScannerOpen(false); // Close scanner after scan
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.footerContainer}>
//         <Button label="SCAN" onPress={() => setScannerOpen(true)} />
//         <Button label="ADD" />
//       </View>

//       {isScannerOpen && (
//         <Modal
//           visible={isScannerOpen}
//           transparent={true}
//           onRequestClose={() => setScannerOpen(false)}
//         >
//           <QRCodeScanner
//             onRead={handleScan}
//             fadeIn={true}
//             showMarker={true}
//             containerStyle={styles.scannerContainer}
//           />
//         </Modal>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//   },
//   footerContainer: {
//     flex: 1 / 3,
//     alignItems: 'center',
//   },
//   scannerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   },
// });

///

import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";

import { useCameraPermissions } from "expo-camera";

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>QR Code Scanner</Text>
      <View style={{ gap: 20 }}>
        <Pressable onPress={requestPermission}>
          <Text style={styles.buttonStyle}>Request Permissions</Text>
        </Pressable>
        <Link href={"/scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              SCAN
            </Text>
          </Pressable>
          
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "white",
    fontSize: 40,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
});