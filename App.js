'use strict';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, StatusBar} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Input, Button } from 'react-native-elements'
import { BarCodeScanner, Permissions, Font } from 'expo';
//import QrReader from 'react-qr-reader';
//import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';
import IonIcon from 'react-native-vector-icons/Ionicons';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      param: 'receivePage',
      balance:35,
      visitCount:2,
      totalBalance:105,
      qrResult:'',
      address:'0xabdb5581a9df0fc49f6912152f75d550628a62d0',
      hasCameraPermission: null,
      amount: '',
      got:'',
      loading: true,
      disabled:true
    }

  }
  componentDidMount() {
    this._requestCameraPermission();
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Varela-Round': require('./assets/fonts/VarelaRound-Regular.ttf'),
      'Siry': require('./assets/fonts/SiryItalic.otf')
    });
    this.setState({ loading: false });
  }


   _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };


  renderSwitch = (param) => {
   switch (param) {
      case 'login':
        return this.LoginPage();

      case 'dashboard':
        return this.DashboardPage();

      case 'myProfile':
        return this.ProfilePage();

      case 'photoPage':
        return this.PhotoPage();

      case 'qrPage':
        return this.QRPage();

      case 'receivePage':
        return this.ReceivePage();

      case 'sendPage':
        return this.SendPage();
   }
 }

 QRPage = () => {
   return(
     <View>
       <View style = {{justifyContent: 'center', alignItems: 'center'}}>
         <QRCode value={this.state.address} size={300} color='purple' />
       </View>
       <Text/>
       <Text style = {{fontSize:14, fontWeight: 'bold'}}>{this.state.address}</Text>
       <Text/>
         <TouchableOpacity style = {{alignItems:'center', backgroundColor: 'grey', marginTop:50,borderRadius: 20,paddingTop:15,paddingBottom:15}} onPress={()=>{this.setState({param:'myProfile'})}}>
           <Text style = {{fontWeight:'bold',color:'white',fontSize:30}}>BACK</Text>
         </TouchableOpacity>
     </View>
   );
 }

 SendPage = () => {
   return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
              <View>

                <View style = {{alignItems:'center', marginBottom:30}}><Text style = {{fontSize:36}}>송금</Text></View>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 400, width: 400 }}
            />
          <View style = {{alignItems:'center', marginTop:20}}><Text style = {{fontSize:14}}>{this.state.qrResult}</Text></View>

          <View style={styles.inputContainer}>
               <TextInput style={styles.inputs}
                    placeholder="송금액"
                    autoCapitalize='none'
                    autoCorrect={false}
                    />
            </View>

          <TouchableOpacity style = {{alignItems:'center', backgroundColor: 'red', marginTop:50,borderRadius: 20,paddingTop:15,paddingBottom:15}} onPress={()=>{
              Alert.alert('Transaction pending')
              this.setState({param:'myProfile'})
            }}>
              <Text style = {{fontWeight:'bold',color:'white',fontSize:30}}>SEND</Text>
          </TouchableOpacity>
          </View>
        }

      </View>
    );
 }

 /*
 renderQr = () => {
   return (<QrReader
            onScan={this.handleScan}
            style={{ width: '40%' }}
            facingMode='environment'
            />)
  }

  handleScan(data){
      if(data){
        this.setState({
          qrResult: data,
        })
      }
  }
*/
 ReceivePage = () => {
   if(this.state.loading) {
     return (<View><Text>Loading...</Text></View>);
   }
   return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
              <View style = {{}}>
                <View style = {{flex:0.7, top:30}}><BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{ height: 500, width: 400}}
                /></View>
              <View style = {{flex:0.3}}>
                <View style = {{flexDirection:'row', marginLeft:80, marginRight:60}}>
                    <Text style = {{fontSize:72, fontWeight:'bold'}}>{this.state.amount}</Text>
                    <Text style = {{fontSize:72, fontWeight:'bold', color:'#00BFFF'}}> {this.state.got} </Text>

                </View>
            <View style = {{alignItems:'center'}}><Text style = {{fontSize:17}}>{this.state.qrResult}</Text></View>
            <TouchableOpacity disabled = {this.state.disabled} style = {{alignItems:'center', backgroundColor: (this.state.disabled ? '#dcdcdc': '#00BFFF'), bottom: 50, marginTop:50,borderRadius: 20,paddingTop:15,paddingBottom:15, marginBottom:-50}} onPress={()=>{
                //Alert.alert('Transaction pending')
                this.setState({param:'myProfile'})
              }}>
                <Text style = {{fontWeight:'bold',color:'white',fontSize:20, fontFamily:'Varela-Round'}}>RECEIVE</Text>
            </TouchableOpacity>
            </View>
              </View>

        }

      </View>
    );
   }

 _handleBarCodeRead = ({ type, data }) => {
    this.setState({
      address:data,
      qrResult:data,
      amount: '350',
      got:'GG',
      disabled:false
    })
  }


 ProfilePage = () => {
   return(
     <Text>MYPROFILE</Text>
   );
 }

 DashboardPage = () => {
   return(
     <View>
       <View style = {{flexDirection:'row', flexWrap:'wrap', paddingVertical:50, justifyContent:'space-between'}}>
         <View style = {{width:50, justifyContent:'center', alignItems:'center'}}><IonIcon name="ios-menu" size={30} /></View>
         <View style = {{width:200, justifyContent:'center', alignItems:'center'}}><Text style = {{textAlign:'center', fontWeight:'bold'}}>dooli.kim.1107</Text></View>
         <TouchableOpacity onPress={()=>{this.setState({param:'myProfile'})}}>
           <View style = {{width:50, justifyContent:'center', alignItems:'center'}}><IonIcon name="ios-person" size={30}/></View>
         </TouchableOpacity>
       </View>
       <View style = {{flexDirection:'row'}}>
         <Text style = {{flex:1, fontWeight:'bold',fontSize:20, textAlign:'center'}}>DASHBOARD</Text>
         <Text style = {{flex:1, fontWeight:'300',fontSize:20, textAlign:'center'}}>DETAILS</Text>
       </View>
       <View style = {{flexDirection:'row'}}>
         <View style = {{flex:1, borderWidth:1.5, borderColor:'black'}}/>
         <View style = {{flex:1, borderWidth:0.5, borderColor:'black'}}/>
       </View>
       <Text/>
       <Text/>
       <View style = {{flexDirection:'row'}}>
         <View style = {{flex:1,justifyContent:'center'}}>
           <Text style = {{textAlign:'center',fontSize:15, color:'grey'}}>현재 잔액</Text>
           <Text style = {{textAlign:'center',fontSize:55, color:'blue', fontWeight:'bold'}}>{this.state.balance}</Text>
           <Text style = {{textAlign:'center',fontSize:25, color:'black', fontWeight:'bold'}}>GOT coin</Text>
         </View>

         <View style = {{flex:1,justifyContent:'center'}}>
           <Text style = {{textAlign:'left',fontSize:13, color:'grey'}}>누적방문횟수</Text>
           <Text style = {{textAlign:'center',fontSize:20, color:'black', fontWeight:'bold'}}>{this.state.visitCount}  회</Text>
           <Text/>
           <Text style = {{textAlign:'left',fontSize:13, color:'grey'}}>누적액</Text>
           <Text style = {{textAlign:'center',fontSize:20, color:'black', fontWeight:'bold'}}>{this.state.totalBalance}  GOT</Text>
         </View>
       </View>
     </View>
   );
 }

 LoginPage = () => {
   return (
     <View style={styles.container}>
       <Text style = {styles.loginText}>Gotta Go</Text>

         <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                 placeholder="Username"
                 autoCapitalize='none'
                 autoCorrect={false}
                 />
         </View>

           <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                 placeholder="Password"
                 autoCapitalize='none'
                 autoCorrect={false}
                 secureTextEntry={true}
                 />
           </View>
           <TouchableOpacity style = {styles.loginButton} onPress={() => this.setState({param:'dashboard'})} >
             <Text style = {styles.buttonText}>Login</Text>
           </TouchableOpacity>


       <Text>아직 회원이 아니세요?</Text>
         <View style = {{flexDirection: 'row'}}>
         <TouchableOpacity style = {styles.loginButton1}>
           <Text style = {styles.buttonText}>일반회원 가입</Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.loginButton2}>
           <Text style = {styles.buttonText}>장소관리자 등록</Text>
         </TouchableOpacity>
       </View>

       <Text style = {{color: 'grey', marginTop:30}}>Team GottaGo, All Rights Reserved.</Text>
       <Text style = {{color:'blue'}}>Terms of Service</Text>
     </View>

   );
 }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSwitch(this.state.param)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize:36,
    fontWeight:'bold',
  //  fontFamily: 'Zapfino',
    marginBottom: 40
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 40,
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:100,
    paddingRight:100,
    marginBottom:30
  },
  loginButton1: {
    backgroundColor: 'red',
    borderRadius: 30,
    marginTop:30,
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:35,
    paddingRight:35
  },
  loginButton2: {
    backgroundColor: '#40E0D0',
    borderRadius: 30,
    marginTop:30,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:15,
    paddingLeft:30,
    paddingRight:30
  },
  inputs:{
      height:45,
      marginLeft:16,
      flex:1,
      fontSize:15
  },
  inputContainer: {
      borderColor: 'grey',
      backgroundColor: '#FFFFFF',
      borderRadius:10,
      borderWidth: 2,
      width:250,
      height:45,
      marginBottom:15,
      marginTop:15,
      marginLeft:70
  },
  buttonText: {
    fontSize:15,
    fontWeight:'bold',
    color:'#fff'
  }
});
