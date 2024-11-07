import React, { useState } from "react";
import { Alert, Button, TextInput, View, StyleSheet } from "react-native";
import * as SMS from "expo-sms";
import { v4 as uuidv4 } from "uuid";  // To generate a unique ticket number

const SendTicketPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  // Function to send the SMS
  const sendSms = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    // Generate a unique ticket number
    const newTicketNumber = uuidv4();
    setTicketNumber(newTicketNumber);

    // URL that the user will click to view their ticket details (replace with actual URL)
    const ticketUrl = `${newTicketNumber}`;

    // Check if SMS is available
    const { result } = await SMS.sendSMSAsync(
      phoneNumber,
      `Your ticket has been created. View your ticket details here: ${ticketUrl}`
    );

    if (result === "sent") {
      Alert.alert("SMS Sent", "Ticket details have been sent to the user.");
    } else {
      Alert.alert("Failed", "There was an issue sending the SMS.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send SMS" onPress={sendSms} />
      {ticketNumber && (
        <View style={styles.ticketContainer}>
          <Button
            title="View Ticket"
            onPress={() => Alert.alert("Ticket Details", `Ticket Number: ${ticketNumber}`)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  ticketContainer: {
    marginTop: 20,
  },
});

export default SendTicketPage;
