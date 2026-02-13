import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';

interface Props {
  children: ReactNode;
}

export default function GradientBackground({ children }: Props) {
  return (
    <LinearGradient
      colors={[colors.background.start, colors.background.end]}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
