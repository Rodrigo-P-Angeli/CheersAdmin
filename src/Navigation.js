/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import MenuDrawer from './components/MenuDrawer'
import Pedidos from './screens/Pedidos'
import PedidosFechados from './screens/PedidosFechados'
import EditCardapio from './screens/EditCardapio'
import SplashScreen from './screens/SplashScreen';
import { connect } from 'react-redux';

import { logout, loadUser, userSignIn, finishedLoadingUser, loadingUserFunction, createUser, login } from './store/actions/user'
import Auth from './screens/Auth';

import CommonStyles from './CommonStyles';
import EditItem from './components/EditItem';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const initialState = {
    isSinedIn: false,
    isLoading: true,
}

class BottomTab extends Component {
    render() {
        return (
            <Tab.Navigator initialRouteName="Pedidos em aberto" backBehavior={'initialRoute'} tabBarOptions={tabBar}>
                <Tab.Screen
                    name="Pedidos em aberto"
                    component={Pedidos}
                    options={{
                        tabBarLabel: 'Pedidos em aberto',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="beer" color={color} size={size} />
                        ),
                    }}
                />
                {/* <Tab.Screen
                    name="Dados do Cliente"
                    component={DadosCliente2}
                    options={{
                        tabBarLabel: 'Dados do Cliente',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person" color={color} size={size} />
                        ),
                    }}
                /> */}
            </Tab.Navigator>
        )
    }
}

class AppDrawer extends Component {
    render() {
        return (
            <Drawer.Navigator
                initialRouteName="Pedidos Abertos"
                drawerContent={props => <MenuDrawer {...props} user={this.props.user} onSignOut={this.props.onSignOut} />}
                drawerContentOptions={drawerOptions}
                backBehavior={'initialRoute'} >
                <Drawer.Screen name="Pedidos Abertos" component={BottomTab} />
                <Drawer.Screen name="Pedidos Fechados" component={PedidosFechados} />
                <Drawer.Screen name="Cardapio" component={AppStack} />
            </Drawer.Navigator>
        )
    }
}

class AppStack extends Component {
    render() {
        return (
            <Stack.Navigator headerMode='screen'>
                <Stack.Screen name="EditCardapio">
                    {(props) => <EditCardapio {...props} {...this.props} />}
                </Stack.Screen>
                <Stack.Screen name="FinalizarPedido" >
                    {(props) => <EditItem {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}

class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
                    {this.props.loadingUser ?
                        <Stack.Screen name="SplashScreen">
                            {() => <SplashScreen loadUser={this.props.loadingUserFunction} finishedLoadUser={this.props.finishedLoadingUser} {...this.props} />}
                        </Stack.Screen> : this.props.user ?
                            <Stack.Screen name="Cardápio">
                                {() => <AppDrawer {...this.props} onSignOut={() => this.props.logout()} />}
                            </Stack.Screen> :
                            <Stack.Screen name="Login" >
                                {() => <Auth {...this.props} FacebookButtonPress={this.props.onFacebookButtonPress} GoogleButtonPress={this.props.onGoogleButtonPress} createUser={this.props.createUser} loginUser={this.props.loginUser} />}
                            </Stack.Screen>}
                </Stack.Navigator>
            </NavigationContainer >
        )
    }
}


const mapStateToProps = ({ user }) => {
    return {
        user: user.user,
        loadingUser: user.loadingUser,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadUser: () => dispatch(loadUser()),
        userSignIn: (user) => dispatch(userSignIn(user)),
        logout: () => dispatch(logout()),
        loadingUserFunction: () => dispatch(loadingUserFunction()),
        finishedLoadingUser: () => dispatch(finishedLoadingUser()),
        createUser: (name, email, senha) => dispatch(createUser(name, email, senha)),
        loginUser: (email, senha) => dispatch(login(email, senha)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)



const drawerOptions = {
    labelStyle: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
    },
    activeTintColor: CommonStyles.Colors.buttons,
    inactiveTintColor: '#333',
    activeBackgroundColor: 'white'
}


const tabBar = {
    activeTintColor: CommonStyles.Colors.buttons,
    //inactiveTintColor: '#679A7A',
    labelStyle: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 15,
    },
}
