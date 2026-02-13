import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const widthAnim = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const progress = current / total;

  useEffect(() => {
    if (containerWidth > 0) {
      widthAnim.value = withTiming(progress * containerWidth, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [current, total, containerWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: widthAnim.value,
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.stepText}>
          Step {current} of {total}
        </Text>
        <Text style={styles.percentText}>{Math.round(progress * 100)}%</Text>
      </View>
      <View style={styles.track} onLayout={handleLayout}>
        <Animated.View style={[styles.fill, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: colors.text.secondary,
  },
  percentText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: colors.accent,
  },
  track: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
  },
});
