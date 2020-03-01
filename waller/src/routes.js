import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import color from '~/styles/dark';

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

import Dashboard from './pages/Dashboard';
import Actives from './pages/Actives';
import Performance from './pages/Performance';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: Dashboard,
              navigationOptions: {
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="home"
                    size={25}
                    color={focused ? color.blue : '#999'}
                  />
                ),
              },
            },
            Actives: {
              screen: Actives,
              navigationOptions: {
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="view-module"
                    size={25}
                    color={focused ? color.blue : '#999'}
                  />
                ),
              },
            },
            Performance: {
              screen: Performance,
              navigationOptions: {
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="list"
                    size={25}
                    color={focused ? color.blue : '#999'}
                  />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              activeTintColor: color.blue,
              inactiveTintColor: '#999',
              style: {
                borderTopWidth: 0,
                backgroundColor: color.secundary,
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
