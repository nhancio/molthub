import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Cloud, Monitor, ArrowRight, ArrowLeft } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import SetupOptionCard from '@/components/SetupOptionCard';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

type SetupMode = 'cloud' | 'local';

export default function SetupChoiceScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<SetupMode>('cloud');

  const handleContinue = () => {
    if (selected === 'cloud') {
      router.push('/cloud-wizard');
    } else {
      router.push('/local-wizard');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.safeArea}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color={colors.text.primary} />
        </Pressable>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.headerBlock}>
            <Text style={styles.title}>Choose Your Setup</Text>
            <Text style={styles.subtitle}>
              Select your preferred installation method
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.cards}>
            <SetupOptionCard
              title="Run on Cloud"
              badge="FASTEST"
              tags={['Anywhere', 'Always On', 'Multi-device']}
              icon={<Cloud size={28} color={colors.accent} />}
              selected={selected === 'cloud'}
              onPress={() => setSelected('cloud')}
            />
            <SetupOptionCard
              title="Run Locally"
              tags={['Private', 'Fast', 'Free']}
              icon={<Monitor size={28} color={colors.accent} />}
              selected={selected === 'local'}
              onPress={() => setSelected('local')}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continue</Text>
              <ArrowRight size={20} color={colors.text.primary} />
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 56,
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xl + 8,
  },
  headerBlock: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  cards: {
    gap: spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: spacing.sm,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.xl,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  continueText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.text.primary,
  },
});
