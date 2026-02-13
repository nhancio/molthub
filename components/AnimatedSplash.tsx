import { useEffect } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';

const { width, height } = Dimensions.get('window');

interface AnimatedSplashProps {
  onFinish: () => void;
}

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const mascotScale = useSharedValue(0);
  const mascotRotate = useSharedValue(-15);
  const mascotY = useSharedValue(30);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const containerOpacity = useSharedValue(1);
  const glowScale = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    mascotScale.value = withSequence(
      withSpring(1.15, { damping: 6, stiffness: 120 }),
      withSpring(1, { damping: 10, stiffness: 100 })
    );

    mascotRotate.value = withSequence(
      withSpring(8, { damping: 6, stiffness: 80 }),
      withSpring(-5, { damping: 8, stiffness: 90 }),
      withSpring(0, { damping: 12, stiffness: 100 })
    );

    mascotY.value = withSequence(
      withSpring(-20, { damping: 6, stiffness: 100 }),
      withSpring(5, { damping: 8, stiffness: 90 }),
      withSpring(0, { damping: 12, stiffness: 100 })
    );

    glowScale.value = withDelay(200, withSpring(1, { damping: 8, stiffness: 60 }));
    glowOpacity.value = withDelay(200, withTiming(0.6, { duration: 600 }));

    titleOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));
    titleY.value = withDelay(500, withSpring(0, { damping: 12, stiffness: 100 }));

    containerOpacity.value = withDelay(
      2200,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }, () => {
        runOnJS(onFinish)();
      })
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: mascotScale.value },
      { rotate: `${mascotRotate.value}deg` },
      { translateY: mascotY.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.glow, glowStyle]} />

      <Animated.View style={mascotStyle}>
        <Image
          source={require('@/assets/images/ChatGPT_Image_Feb_13,_2026,_09_57_34_PM.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.titleContainer, titleStyle]}>
        <Animated.Text style={styles.title}>ClawdBot</Animated.Text>
        <Animated.Text style={styles.subtitle}>Your Setup Assistant</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.start,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  glow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(229, 57, 53, 0.12)',
  },
  mascot: {
    width: 180,
    height: 180,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.text.secondary,
  },
});
