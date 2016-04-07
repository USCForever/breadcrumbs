var React = require('react-native')
var PastTrips = require('./PastTrips')
var TripPage = require('./TripPage')
var api = require('../Utils/api')

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
  AlertIOS,
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: Image.resizeMode.contain,
    width: null,
    height: null,
    resizeMode: 'stretch'

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
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    opacity: 0.7,
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#FF3366',
    // borderColor: 'white',
    // borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 50,
    marginLeft: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

class Home extends React.Component{
  constructor(props){
    super(props);
    watchID: (null: ?number),
    this.state = {
      isLoading: false,
      initialPosition: {},
      lastPosition: {}
    }
  }

  goToPastTrips(){
   api.getTrips(this.props.username)
    .then((data)=> {
      data = data || {};
    this.props.navigator.push({
      title: "Past Trips",
      component: PastTrips,
      passProps: {
        username: this.props.username,
        trips: data,
        lastPosition: this.state.lastPosition,
      }
    })
  })
}

  newTrip(){
    var pingList = [];
    var pings = function() {
        navigator.geolocation.getCurrentPosition(
          (position)=> {
            var initialPosition = position;
            this.setState({initialPostion: initialPosition})
          },
        );
        this.watchID = navigator.geolocation.watchPosition((position)=> {
          var lastPosition = position;
          this.setState({lastPosition: lastPosition})
          pingList.push(this.state.lastPosition)
        }
      )
    }.bind(this);
    pings();
    this.props.navigator.push({
      title: "Trip Page",
      component: TripPage,
      passProps: {
        pings: pings,
        pingList: pingList,
        username: this.props.username,
        watchID: this.watchID,
        lastPosition: this.state.lastPosition
        }
    });
  }

  whichButton(){
    if(!this.hasOwnProperty('watchID')){
      return (
        <Text style={styles.buttonText}>Start New Trip</Text>
      )
    } else {
      return (
        <Text style={styles.buttonText}>Resume Trip</Text>
      )
    }
  }

  render(){
    return (
      <Image source={require('../Images/bay-bridge-traffic.gif')} style={styles.backgroundImage}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.goToPastTrips.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>Past Trips</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.newTrip.bind(this)}
          underlayColor='#88D4F5'>
            { this.whichButton() }
        </TouchableHighlight>
      </Image>
    )
  }
}

module.exports = Home;




























