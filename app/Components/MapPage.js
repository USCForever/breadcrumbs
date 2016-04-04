  var React = require('react-native')
var MapView = require('react-native-maps')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

// debugger
var marker = {
  latlng: {
    latitude: 37.78825,
    longitude: -122.4324
  },
  title: 'Crumb Title!',
  description: 'Heres a fun crumb!'
};


class MapPage extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      crumbs: this.props.trip,
      isLoading: false,
      error: false
    }
  }
  
  renderRow(rowData){
    return (
      <MapView.Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />
    )
  };
  render(){
    return (
      <View style={styles.mainContainer}>
       <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0,
          longitudeDelta: 0
        }}>{this.props.trip.map(marker => (
          <MapView.Marker
            coordinate={{
              latitude: marker.pos.coords.latitude,
              longitude: marker.pos.coords.longitude
            }}
            title={marker.title}
            description={marker.note}
          />
          ))}
        </MapView>
      </View>
    )
  }
}

MapPage.propTypes = {
  trip: React.PropTypes.array.isRequired
};

module.exports = MapPage;