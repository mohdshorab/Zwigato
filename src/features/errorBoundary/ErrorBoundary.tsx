import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomIonicIcon } from '../../components';
import COLORS from '../../utils/constants/Colors';
import { ms } from '../../utils/Layout';
import NavigationService from '../../navigation/NavigationService';
import { store } from '../../store/store';
import { styles } from './ErrorBoundary.styles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Zwigato App Crash Captured:', error, errorInfo);
  }

  handleRestart = () => {
    const state = store.getState();
    const accessToken = state.authUser.accessToken;
    this.setState({ hasError: false }, () => {
      if (accessToken) {
        NavigationService.reset('AppStack');
      } else {
        NavigationService.reset('AuthStack');
      }
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <CustomIonicIcon
                name="fast-food-outline"
                size={ms(100)}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.title}>Something went wrong!</Text>
            <Text style={styles.subtitle}>
              We hit an unexpected bump while preparing your experience. Let's
              get you back to the menu.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={this.handleRestart}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
