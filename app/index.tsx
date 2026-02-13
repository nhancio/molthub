import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { MessageCircle, BookOpen } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

export default function WelcomeScreen() {
  const router = useRouter();
  const floatY = useSharedValue(0);
  const floatRotate = useSharedValue(0);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(8, { duration: 1800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    floatRotate.value = withRepeat(
      withSequence(
        withDelay(200, withTiming(3, { duration: 2000, easing: Easing.inOut(Easing.ease) })),
        withTiming(-3, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const mascotFloat = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatY.value },
      { rotate: `${floatRotate.value}deg` },
    ],
  }));

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.header}>
          <View style={styles.iconOuter}>
            <View style={styles.iconGlow} />
            <Animated.View style={mascotFloat}>
              <Image
                source={require('@/assets/images/ChatGPT_Image_Feb_13,_2026,_09_57_34_PM.png')}
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.textBlock}>
          <Text style={styles.title}>Setup for OpenClaw</Text>
          <Text style={styles.subtitle}>MoltBot / ClawDBot</Text>
          <Text style={styles.description}>
            Welcome to the Installation Guide. Learn how to set up MoltBot on a
            cloud server or your local machine in a few simple steps.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonPrimary,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/assistant')}
          >
            <MessageCircle size={20} color={colors.text.primary} />
            <Text style={styles.buttonText}>AI Assistant for MoltBot</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonSecondary,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/setup-choice')}
          >
            <BookOpen size={20} color={colors.text.primary} />
            <Text style={styles.buttonText}>Start Tutorial</Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800).duration(600)}>
          <Text style={styles.footer}>Takes only a few minutes to complete</Text>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  header: {
    alignItems: 'center',
  },
  iconOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(229, 57, 53, 0.12)',
  },
  mascotImage: {
    width: 130,
    height: 130,
  },
  textBlock: {
    alignItems: 'center',
    gap: spacing.sm + 2,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.accent,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  buttons: {
    width: '100%',
    gap: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm + 2,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.xl,
  },
  buttonPrimary: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(229, 57, 53, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(229, 57, 53, 0.4)',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.text.primary,
  },
  footer: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: colors.text.muted,
  },
});
