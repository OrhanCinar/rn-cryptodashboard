import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View
} from "react-native";
import { ListItem, Button, ThemeProvider, Icon } from "react-native-elements";

const coinList = [
  {
    id: "btcusdt",
    price: 0
  },
  {
    id: "ethbtc",
    price: 0
  },
  {
    id: "xlmbtc",
    price: 0
  },
  {
    id: "adabtc",
    price: 0
  },

  {
    id: "bnbbtc",
    price: 0
  },
  {
    id: "elfbtc",
    price: 0
  },
  {
    id: "xrpbtc",
    price: 0
  },
  {
    id: "storjbtc",
    price: 0
  },
  {
    id: "mcobtc",
    price: 0
  },
  {
    id: "manabtc",
    price: 0
  },
  {
    id: "steembtc",
    price: 0
  },
  {
    id: "gntbtc",
    price: 0
  },
  {
    id: "sysbtc",
    price: 0
  }
];
function getCoinEndPoints() {
  let endPoint = "";

  for (var item in coinList) {
    endPoint += `${coinList[item].id}@miniTicker/`;
  }

  return endPoint;
}
const theme = {
  colors: {
    primary: "pink"
  }
};
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      coinList: coinList
    };
  }

  startSocket() {
    const endPoints = getCoinEndPoints();
    console.log(endPoints);
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${endPoints}`);

    ws.onopen = () => {
      console.log("opening");
    };

    ws.onclose = () => {
      console.log("closing");
    };

    ws.onerror = event => {
      console.log(`Error : ${event}`);
    };

    ws.onmessage = e => {
      const data = JSON.parse(e.data);

      const id = data["s"].toLowerCase();
      const price = data["c"];
      let coinExists = this.state.coinList.find(c => c.id === id);
      //console.log(id);

      switch (data.e) {
        case "24hrMiniTicker":
          this.setState({
            ...this.state,
            coinList: this.state.coinList.map(c =>
              c.id === id
                ? {
                    ...c,
                    price: price,
                    priceChange: coinExists.price > price ? "down" : "up"
                  }
                : c
            )
          });
          break;
        default:
      }
    };
  }

  componentDidMount() {
    this.startSocket();
  }
  keyExtractor = (item, index) => item.id;
  renderItem = ({ item }) => {
    console.log(item.priceChange);
    <ListItem
      style={{
        color: item.priceChange === "up" ? styles.greenRow : styles.redRow
      }}
      title={"item.id"}
      price={"item.price"}
    />;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <ScrollView>
            {this.state.coinList.map((item, i) => (
              <ListItem
                key={item.id}
                title={`${item.id.toUpperCase()}`}
                subtitle={item.price.toString()}
                leftIcon={{ name: "toll" }}
                subtitleStyle={
                  item.priceChange === "up" ? styles.greenRow : styles.redRow
                }
              />
            ))}
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}
<Icon name="arrow_drop_do" />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  redRow: {
    color: "red"
  },
  greenRow: {
    color: "green"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
