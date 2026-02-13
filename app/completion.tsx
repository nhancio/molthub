import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { CheckCircle, Home, MessageCircle } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import ConfettiAnimation from '@/components/ConfettiAnimation';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

export default function CompletionScreen() {
  const router = useRouter();

  return (
    <GradientBackground>
      <View style={styles.container}>
        <ConfettiAnimation />

        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.iconBlock}>
          <View style={styles.successGlow} />
          <View style={styles.successCircle}>
            <CheckCircle size={48} color={colors.success} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.textBlock}>
          <Text style={styles.title}>You're All Set!</Text>
          <Text style={styles.subtitle}>
            MoltBot has been successfully configured and is ready to use.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.infoCard}>
          <Text style={styles.infoTitle}>What's Next?</Text>
          <Text style={styles.infoText}>
            Your bot is now running. Start chatting through your connected
            channel or use the AI Assistant for further configuration help.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(900).duration(600)} style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonPrimary,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.replace('/')}
          >
            <Home size={20} color={colors.text.primary} />
            <Text style={styles.buttonText}>Back to Home</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonOutline,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/assistant')}
          >
            <MessageCircle size={20} color={colors.text.primary} />
            <Text style={styles.buttonText}>Open AI Assistant</Text>
          </Pressable>
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
  iconBlock: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderWidth: 2,
    borderColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    width: '100%',
    gap: spacing.sm,
  },
  infoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.text.primary,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
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
  buttonOutline: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
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
});
