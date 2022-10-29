import { StyleSheet, Text, View, FlatList } from "react-native";
import { firebase } from "../../config";
import React, { useEffect, useState } from "react";

const Dashboard = ({ navigation }) => {
  const [stocks, setStocks] = useState([]);
  const todoRef = firebase.firestore().collection("stocks");
  useEffect(async () => {
    todoRef.onSnapshot((querySnapshot) => {
      const stocks = [];
      querySnapshot.forEach((doc) => {
        const {
          amount,
          quantity,
          stockName,
          date,
          transactionType,
          unit,
          invest,
        } = doc.data();
        stocks.push({
          id: doc.id,
          amount,
          quantity,
          stockName,
          transactionType,
          date,
          unit,
          invest,
        });
      });
      setStocks(stocks);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={stocks}
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              marginBottom: 10,
              borderRadius: 10,
              marginHorizontal: 25,
              paddingHorizontal: 10,
              paddingVertical: 10,
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text style={styles.title}>{item.stockName}</Text>
            <View style={styles.card}>
              <View>
                <Text style={styles.title}>Total Units</Text>
                <Text style={styles.description}>{item.unit}</Text>
              </View>
              <View>
                <Text style={styles.title}>Current Amount</Text>
                <Text style={styles.description}>{item.amount}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View>
                <Text style={styles.title}>Total investment</Text>
                <Text style={styles.description}>{item.invest}</Text>
              </View>
              <View>
                <Text style={styles.title}>Sold Value</Text>
                <Text style={styles.description}>
                  {item.unit * item.amount}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <View>
                <Text style={styles.title}>Overall Profit</Text>
                <Text style={styles.description}>
                  {item.unit * item.amount - item.invest}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff5f7",
  },
  title: {
    fontSize: 15,
    color: "#062680",
    letterSpacing: 0.4,
    paddingHorizontal: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
    width: 150,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
});

export default Dashboard;
