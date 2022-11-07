/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import React from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  };
  const biometryType = ReactNativeBiometrics.isSensorAvailable();

  if (biometryType === ReactNativeBiometrics.Biometrics) {
    //do something face id specific
  }
  ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;

    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      console.log('TouchID is supported');
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      console.log('FaceID is supported');
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      console.log('Biometrics is supported');
    } else {
      console.log('Biometrics not supported');
    }
  });

  // const sendPublicKeyToServer = publicKey => {
  //   // const api = `http://localhost:0000/api/key/signature/${publicKey}`

  //   console.log(publicKey);
  // };

  ReactNativeBiometrics.createKeys('Confirm fingerprint').then(resultObject => {
    const {publicKey} = resultObject;
    console.log('publicKey: ', publicKey);
  });

  ReactNativeBiometrics.biometricKeysExist().then(resultObject => {
    const {keysExist} = resultObject;

    if (keysExist) {
      console.log('Keys exist');
    } else {
      console.log('Keys do not exist or were deleted');
    }
  });

  ReactNativeBiometrics.deleteKeys().then(resultObject => {
    const {keysDeleted} = resultObject;

    if (keysDeleted) {
      console.log('Successful deletion');
    } else {
      console.log('Unsuccessful deletion because there were no keys to delete');
    }
  });

  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + 'some message';

  ReactNativeBiometrics.createSignature({
    promptMessage: 'Generation signature',
    payload: payload,
  }).then(signature => {
    console.log(payload + 'signature' + signature);
    // if (success) {
    //   console.log('signature:', signature);
    //   // verifySignatureWithServer(signature, payload);
    // } else {
    //   console.log('false signature: ');
    // }
  });

  ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
    .then(resultObject => {
      const {success} = resultObject;

      if (success) {
        console.log('successful biometrics provided');
      } else {
        console.log('user cancelled biometric prompt');
      }
    })
    .catch(() => {
      console.log('biometrics failed');
    });

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#000',
          fontWeight: '600',
        }}>
        Email
      </Text>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Text
        style={{
          color: '#000',
          fontWeight: '600',
        }}>
        Password
      </Text>
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableHighlight
        style={styles.btn}
        // onPress={this._clickHandler}
        underlayColor="#0380BE"
        activeOpacity={1}>
        <Text
          style={{
            color: '#000',
            fontWeight: '600',
          }}>
          {`Authenticate with ${biometryType}`}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
