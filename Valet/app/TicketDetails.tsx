import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const TicketDetails = ({ route, navigation }) => {
  const { ticketNumber } = route.params; // Getting the ticket number from navigation params
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    // Further actions on confirmation, like updating the server
    alert("Ticket Confirmed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Details</Text>
      <Text style={styles.details}>Ticket Number: {ticketNumber}</Text>
      <Button title="Confirm Ticket" onPress={handleConfirm} disabled={confirmed} />
      {confirmed && <Text style={styles.confirmedText}>Ticket confirmed!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  details: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmedText: {
    color: 'green',
    fontSize: 18,
    marginTop: 16,
  },
});

export default TicketDetails;
