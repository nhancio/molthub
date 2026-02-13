import { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CONFETTI_COLORS = [
  '#E53935',
  '#FF5252',
  '#FF8A80',
  '#4CAF50',
  '#FFC107',
  '#2196F3',
  '#FF6E40',
  '#FFFFFF',
];

const PARTICLE_COUNT = 40;

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  swayAmount: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * SCREEN_WIDTH,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 800,
    duration: 2500 + Math.random() * 2000,
    rotation: Math.random() * 360,
    swayAmount: -30 + Math.random() * 60,
  }));
}

function ConfettiParticle({ particle }: { particle: Particle }) {
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      particle.delay,
      withTiming(SCREEN_HEIGHT + 50, {
        duration: particle.duration,
        easing: Easing.in(Easing.quad),
      })
    );
    rotate.value = withDelay(
      particle.delay,
      withTiming(particle.rotation + 720, {
        duration: particle.duration,
      })
    );
    opacity.value = withDelay(
      particle.delay + particle.duration * 0.7,
      withTiming(0, { duration: particle.duration * 0.3 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        animatedStyle,
        {
          left: particle.x,
          width: particle.size,
          height: particle.size * 1.4,
          backgroundColor: particle.color,
          borderRadius: particle.size > 10 ? 2 : 1,
        },
      ]}
    />
  );
}

const particles = generateParticles();

export default function ConfettiAnimation() {
  return (
    <>
      {particles.map((p) => (
        <ConfettiParticle key={p.id} particle={p} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    top: -20,
  },
});
