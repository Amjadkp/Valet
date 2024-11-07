import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View, StyleSheet , ScrollView } from "react-native";
import { v4 as uuidv4 } from "uuid";  // Install uuid library for unique IDs

const DataEntryScreen = () => {
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    vehicleNumber: "",
    username: "",
  });
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Generate a unique ticket number
    const newTicketNumber = uuidv4(); // Using UUID for unique ticket ID
    setTicketNumber(newTicketNumber);

    // Show confirmation
    Alert.alert("Form Submitted", `Ticket Number: ${newTicketNumber}`);

    // Reset the form
    setForm({
      email: "",
      phoneNumber: "",
      vehicleNumber: "",
      username: "",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Data Entry Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        textContentType="emailAddress"
        value={form.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        value={form.phoneNumber}
        onChangeText={(value) => handleInputChange("phoneNumber", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter vehicle number"
        value={form.vehicleNumber}
        onChangeText={(value) => handleInputChange("vehicleNumber", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter username"
        textContentType="username"
        value={form.username}
        onChangeText={(value) => handleInputChange("username", value)}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {ticketNumber && (
        <Text style={styles.ticketText}>Your Ticket Number: {ticketNumber}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  ticketText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
});

export default DataEntryScreen;

