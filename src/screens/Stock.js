import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-root-toast";
import SelectDropdown from "react-native-select-dropdown";
import { firebase } from "../../config";

const height = Dimensions.get("window").height;
const Stock = ({ navigation }) => {
  const [stocks, setStocks] = useState([]);
  const [nameDrop, setNameDrop] = useState("");
  const [number, setNumber] = useState("");
  const [unit, setUnit] = useState("");
  const [invest, setInvest] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [typeDrop, setTypeDrop] = useState("");
  const todoRef = firebase.firestore().collection("stocks");
  const [addData, setAddData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, isForEditMode = false) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setDate(`${year}-${month}-${day}`);
    hideDatePicker();
  };

  const stockname = [
    "Standard Charter Bank",
    "Nepal Investment Bank",
    "Nabil Bank",
    "Himalayan Bank",
  ];

  const type = ["Buy", "Sell"];

  const addStock = () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      amount: price,
      date: date,
      quantity: number,
      stockName: nameDrop,
      transactionType: typeDrop,
      unit: unit,
      invest: invest,
    };
    todoRef
      .add(data)
      .then(() => {
        setIsSubmitting(true);
        setIsModalVisible(false);
        Toast.show("Successfully added stock", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      })
      .catch((err) => {
        Toast.show("Error while editing document", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        setIsSubmitting(false);
      });
  };

  useEffect(async () => {
    todoRef.onSnapshot((querySnapshot) => {
      const stocks = [];
      querySnapshot.forEach((doc) => {
        const { amount, quantity, stockName, date, transactionType } =
          doc.data();
        stocks.push({
          id: doc.id,
          amount,
          quantity,
          stockName,
          transactionType,
          date,
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
                <Text style={styles.title}>TransactionType</Text>
                <Text style={styles.description}>{item.transactionType}</Text>
              </View>
              <View>
                <Text style={styles.title}>Amount</Text>
                <Text style={styles.description}>{item.amount}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View>
                <Text style={styles.title}>Quantity</Text>
                <Text style={styles.description}>{item.quantity}</Text>
              </View>
              <View>
                <Text style={styles.title}>Date</Text>
                <Text style={styles.description}>{item.date}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={toggleModal}
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: height - 200,
          right: 30,
          backgroundColor: "#062680",
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: 55,
          height: 55,
          borderRadius: 55 / 2,
        }}
      >
        <Ionicons
          style={{ alignSelf: "center" }}
          name="add-outline"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      <Modal
        style={{
          width: "100%",
          marginHorizontal: "auto",
        }}
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={() => {
          setIsModalVisible(false);
        }}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.2)",
            marginBottom: -20,
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: "30%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 10,
              marginBottom: 20,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    color: "#062680",
                    marginLeft: 15,
                  }}
                >
                  Available Stocks
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  <Ionicons name="ios-close" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={{ marginVertical: 10 }}>
              <Text
                style={{
                  color: "#062680",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  marginBottom: 5,
                }}
              >
                Stock Name:
              </Text>

              <SelectDropdown
                data={stockname}
                onSelect={(selectedItem, index) => {
                  setNameDrop(selectedItem);
                }}
                defaultButtonText={
                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                      textAlign: "left",
                    }}
                  >
                    Select stock name
                  </Text>
                }
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.statusDropDown}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Entypo
                      name={
                        isOpened
                          ? "chevron-with-circle-up"
                          : "chevron-with-circle-down"
                      }
                      color={"#062680"}
                      size={18}
                    />
                  );
                }}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
              />

              <Text
                style={{
                  color: "#062680",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  marginBottom: 5,
                }}
              >
                Stock Number:
              </Text>

              <TextInput
                style={styles.textInput}
                fontSize={16}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Enter number of stocks"
                multiline={true}
                onChangeText={(text) => setNumber(text)}
                placeholderTextColor="black"
                keyboardType="number-pad"
              />

              <Text
                style={{
                  color: "#062680",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  marginBottom: 5,
                }}
              >
                Unit:
              </Text>

              <TextInput
                style={styles.textInput}
                fontSize={16}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Enter unit"
                multiline={true}
                onChangeText={(text) => setUnit(text)}
                placeholderTextColor="black"
                keyboardType="number-pad"
              />

              <Text
                style={{
                  color: "#062680",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  marginBottom: 5,
                }}
              >
                Total Investment:
              </Text>

              <TextInput
                style={styles.textInput}
                fontSize={16}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Enter investment"
                multiline={true}
                onChangeText={(text) => setInvest(text)}
                placeholderTextColor="black"
                keyboardType="number-pad"
              />

              <Text
                style={{
                  color: "#062680",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  marginBottom: 5,
                }}
              >
                Transaction type:
              </Text>

              <SelectDropdown
                data={type}
                onSelect={(selectedItem, index) => {
                  setTypeDrop(selectedItem);
                }}
                defaultButtonText={
                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                      textAlign: "left",
                    }}
                  >
                    Select transaction type
                  </Text>
                }
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.statusDropDown}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Entypo
                      name={
                        isOpened
                          ? "chevron-with-circle-up"
                          : "chevron-with-circle-down"
                      }
                      color={"#062680"}
                      size={18}
                    />
                  );
                }}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
              />

              <Text
                style={{
                  color: "#062680",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  marginBottom: 5,
                }}
              >
                Buying / Selling price:
              </Text>

              <TextInput
                style={styles.textInput}
                fontSize={16}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Enter price"
                multiline={true}
                onChangeText={(text) => setPrice(text)}
                placeholderTextColor="black"
                keyboardType="number-pad"
              />

              <Text
                style={{
                  color: "#062680",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  marginBottom: 5,
                }}
              >
                Transaction Date:
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                }}
              >
                <TextInput
                  style={styles.dateInput}
                  fontSize={16}
                  autoCorrect={false}
                  value={date}
                  onChangeText={(text) => setDate(text)}
                  placeholder="Enter transaction date"
                  multiline={true}
                  placeholderTextColor="black"
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <Ionicons
                    style={{
                      marginRight: -55,
                      marginTop: 15,
                    }}
                    name="calendar"
                    size={24}
                    color="#062680"
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={styles.modalRow}>
                <TouchableOpacity
                  onPress={addStock}
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: "#062680",
                    },
                  ]}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        letterSpacing: 0.5,
                      }}
                    >
                      SUBMIT
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  statusDropDown: {
    marginLeft: 20,
    marginRight: 20,
    height: 55,
    backgroundColor: "#F1FBFF",
    marginBottom: 10,
    borderRadius: 5,
    width: "88%",
  },
  dropdown1BtnStyle: {
    marginLeft: 10,
    marginRight: 10,
    height: 55,
    backgroundColor: "#F1FBFF",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "rgba(222,222,222, 0.45)",
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    width: "94%",
  },

  dropdown2DropdownStyle: {
    backgroundColor: "#F1FBFF",
    borderRadius: 10,
    textAlign: "left",
  },
  dropdown2BtnTxtStyle: {
    color: "black",
    fontSize: 15,
    textAlign: "left",
    marginLeft: 5,
    flexDirection: "row",
  },
  dropdown2RowStyle: {
    backgroundColor: "#F1FBFF",
  },

  dropdown2RowTxtStyle: {
    color: "black",
    textAlign: "left",
    fontSize: 14,
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    height: 55,
    backgroundColor: "#F1FBFF",
    marginBottom: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 15,
    color: "black",
    paddingHorizontal: 10,
  },
  dateInput: {
    marginLeft: 20,
    marginRight: 10,
    height: 55,
    backgroundColor: "#F1FBFF",
    marginBottom: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 15,
    color: "black",
    paddingHorizontal: 5,
    width: "100%",
  },
  modalButton: {
    borderWidth: 0,
    padding: 10,
    borderRadius: 5,
    width: "80%",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default Stock;
