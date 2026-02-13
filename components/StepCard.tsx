import { StyleSheet, Text, View, Image } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';
import { SetupStep } from '@/data/cloudSteps';

interface Props {
  step: SetupStep;
  total: number;
}

export default function StepCard({ step, total }: Props) {
  const isLastStep = step.id === total;

  return (
    <Animated.View entering={FadeInRight.duration(300)} style={styles.container}>
      <View style={styles.numberContainer}>
        <View style={[styles.numberBadge, isLastStep && styles.numberBadgeSuccess]}>
          <Text style={styles.numberText}>
            {isLastStep ? '\u2713' : step.id}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{step.title}</Text>

      <View style={styles.descriptionCard}>
        <Text style={styles.description}>{step.description}</Text>
      </View>

      <View style={styles.imagePlaceholder}>
        {step.image ? (
          <Image
            source={step.image}
            style={styles.stepImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholderInner}>
            <Text style={styles.imagePlaceholderText}>
              {isLastStep ? 'All Done!' : `Screenshot for Step ${step.id}`}
            </Text>
          </View>
        )}
      </View>

      {step.details && (
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Additional Info</Text>
          <Text style={styles.detailsText}>{step.details}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  numberContainer: {
    alignItems: 'center',
  },
  numberBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  numberBadgeSuccess: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },
  numberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: colors.text.primary,
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    width: '100%',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderStyle: 'dashed',
  },
  stepImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholderInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: colors.text.muted,
  },
  detailsCard: {
    backgroundColor: 'rgba(229, 57, 53, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(229, 57, 53, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '100%',
    gap: spacing.sm,
  },
  detailsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: colors.accent,
  },
  detailsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
