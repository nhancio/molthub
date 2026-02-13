import { ReactNode } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

interface Props {
  title: string;
  badge?: string;
  tags: string[];
  icon: ReactNode;
  selected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SetupOptionCard({
  title,
  badge,
  tags,
  icon,
  selected,
  onPress,
}: Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      selected ? colors.cardSelectedBorder : colors.cardBorder,
      { duration: 250 }
    ),
    backgroundColor: withTiming(
      selected ? colors.cardSelected : colors.card,
      { duration: 250 }
    ),
    transform: [{ scale: withTiming(selected ? 1.02 : 1, { duration: 250 }) }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.card, animatedStyle]}
    >
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      {selected && <View style={styles.selectedIndicator} />}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(229, 57, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.text.primary,
    textAlign: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.text.secondary,
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: colors.accent,
    borderTopLeftRadius: borderRadius.full,
    borderTopRightRadius: borderRadius.full,
  },
});
