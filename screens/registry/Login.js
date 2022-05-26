import { View, SafeAreaView, Text, TextInput, StatusBar, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox';
import { Button, Divider, Alert } from 'react-native-paper'
import axios from '../../axios'
const Login = () => {
  const [watch, setWatch] = useState(false);
  const watchPassword = () => {
    setWatch(!watch)
  }
  const navigate = useNavigation().navigate;
  const [isChecked, setIsChecked] = useState(false)

  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    phone: ""
  })
  const handleChange = (text, mode) => {
    setValues({ ...values, [mode]: text });
  }
  const [error, setError] = useState(null)
  const hello = async () => {
    try {
      let response = await (await axios.post('/api/auth/login', values)).data;
      localStorage.setItem('token', response);
    } catch (error) {
      setError(error.response.data);
    }
  }
  return (
    <SafeAreaView style={tw`android:pt-[${StatusBar.currentHeight + 10}px] bg-white h-full flex-col pb-[${StatusBar.currentHeight}px] px-5 justify-between`}>
      <View style={tw`flex-col`}>
        <View style={tw`pb-10`}>
          <Text style={tw`capitalize font-bold text-2xl`}>Hi, welcome back!👋</Text>
          <Text style={tw`text-lg text-gray-500 pt-1`}>Hello again you've been missed</Text>
          {error && <View style={tw`my-3`}><Text style={tw`font-bold`}>{error}</Text></View>}
        </View>
        <View style={tw`flex-col`}>
          <View style={tw`mb-7`}>
            <Text style={tw`font-semibold text-gray-600 pb-2 text-lg`}>Email Address</Text>
            <TextInput onChangeText={(text) => handleChange(text, 'email')} style={tw`border-2 border-solid text-black py-2 border-gray-500 px-5 rounded-[10px]`} placeholder='Enter your email' />
          </View>
          <View>
            <Text style={tw`font-semibold text-gray-600 pb-2 text-lg`}>Password</Text>
            <View style={tw`relative`}>
              <TextInput onChangeText={(text) => handleChange(text, 'password')} secureTextEntry={!watch} style={tw`border-2 border-solid text-black py-2 border-gray-500 px-5 rounded-[10px]`} placeholder='Enter your password' />
              <MaterialCommunityIcons onPress={watchPassword} style={tw`absolute right-2 top-[32%]`} size={22} name={!watch ? 'eye' : "eye-off"} />
            </View>
          </View>
        </View>
        <View style={tw`my-5 justify-between items-center flex-row`}>
          <Pressable onPress={() => setIsChecked(!isChecked)} style={tw`flex-row items-center`}><Checkbox color={isChecked && 'blue'} style={tw`h-5 w-5`} value={isChecked} /><Text style={tw`ml-2 font-semibold text-lg`}>Remeber me</Text></Pressable>
          <Text style={tw.style(`font-semibold`, { color: 'red' })}>Forgot Password</Text>
        </View>
        <Button mode='contained' style={tw`bg-green-800 my-3`} onPress={hello}>LOGIN</Button>
        <View style={tw`w-full py-3 items-center flex-row`}>
          <Divider style={tw`w-[35%] h-[2px]`} />
          <Text style={tw`px-3 text-gray-500 text-[15px] font-medium capitalize`}>or log in with</Text>
          <Divider style={tw`w-[40%] h-[2px]`} />
        </View>
        <View style={tw`flex-row justify-center`}>
          <View style={tw`flex-row items-center border-2 border-solid border-gray-200 rounded-[10px] py-2 mr-5 px-8`}>
            <Image style={tw`h-[40px] w-[40px]`} source={{ uri: "https://www.facebook.com/images/fb_icon_325x325.png" }} />
            <Text style={tw`font-bold text-lg ml-2`}>Facebook</Text>
          </View>
          <View style={tw`flex-row items-center border-2 border-solid border-gray-200 rounded-[10px] py-2 px-8`}>
            <Image
              style={tw`h-[40px] w-[40px]`}
              source={{ uri: 'https://staffordonline.org/wp-content/uploads/2019/01/Google.jpg' }}
            />
            <Text style={tw`font-bold text-lg ml-2`}>Google</Text>
          </View>
        </View>
      </View>
      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-gray-500 pr-2 text-lg`}>Don't have an account?</Text>
        <Text onPress={() => navigate('signup')} style={tw`font-bold text-xl capitalize text-green-900`}>Sign up</Text>
      </View>
    </SafeAreaView>
  )
}

export default Login