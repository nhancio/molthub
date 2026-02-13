import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import ProgressBar from '@/components/ProgressBar';
import StepCard from '@/components/StepCard';
import { cloudSteps } from '@/data/cloudSteps';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

export default function CloudWizardScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const total = cloudSteps.length;
  const step = cloudSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === total - 1;

  const handleNext = () => {
    if (isLast) {
      router.push('/completion');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (isFirst) {
      router.back();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.safeArea}>
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={20} color={colors.text.primary} />
          </Pressable>
          <Text style={styles.topTitle}>Cloud Setup (AWS)</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar current={currentStep + 1} total={total} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          key={currentStep}
        >
          <StepCard step={step} total={total} />
        </ScrollView>

        <View style={styles.bottomBar}>
          <View style={styles.navRow}>
            {!isFirst ? (
              <Pressable
                style={({ pressed }) => [
                  styles.navButton,
                  styles.navButtonOutline,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleBack}
              >
                <ArrowLeft size={18} color={colors.text.primary} />
                <Text style={styles.navButtonText}>Back</Text>
              </Pressable>
            ) : (
              <View style={styles.navButtonSpacer} />
            )}

            <Pressable
              style={({ pressed }) => [
                styles.navButton,
                styles.navButtonPrimary,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleNext}
            >
              <Text style={styles.navButtonText}>
                {isLast ? 'Finish' : 'Next'}
              </Text>
              <ArrowRight size={18} color={colors.text.primary} />
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.helpButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/assistant')}
          >
            <HelpCircle size={16} color={colors.accent} />
            <Text style={styles.helpText}>Need Help?</Text>
          </Pressable>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: colors.text.primary,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: spacing.md,
  },
  navRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
  },
  navButtonOutline: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  navButtonPrimary: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  navButtonSpacer: {
    flex: 1,
  },
  navButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: colors.text.primary,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    paddingVertical: spacing.sm,
  },
  helpText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.accent,
  },
});
