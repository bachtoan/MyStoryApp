import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const initialState = {
    user: null,
    token: null,
};

export const loginSuccess = (user, token) => ({
    type: 'LOGIN_SUCCESS',
    payload: { user, token },
});
  
export const logout = () => ({
    type: 'LOGOUT',
});
  
export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
          return {
            
            user: action.payload.user,
            token: action.payload.token,
          };
        case 'LOGOUT':
          return {
            user: null,
            token: null,
          };
        default:
          return state;
      }
}

const styles = StyleSheet.create({})