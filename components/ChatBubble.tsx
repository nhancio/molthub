import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Bot } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface Props {
  message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {
  const isBot = message.isBot;

  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify()}
      style={[styles.row, isBot ? styles.rowBot : styles.rowUser]}
    >
      {isBot && (
        <View style={styles.avatar}>
          <Bot size={18} color={colors.accent} />
        </View>
      )}
      <View
        style={[styles.bubble, isBot ? styles.bubbleBot : styles.bubbleUser]}
      >
        <Text style={[styles.text, isBot ? styles.textBot : styles.textUser]}>
          {message.text}
        </Text>
        <Text style={styles.time}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  rowBot: {
    justifyContent: 'flex-start',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(229, 57, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    gap: spacing.xs,
  },
  bubbleBot: {
    backgroundColor: colors.chatBot,
    borderBottomLeftRadius: borderRadius.xs || 4,
  },
  bubbleUser: {
    backgroundColor: colors.chatUser,
    borderBottomRightRadius: borderRadius.xs || 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  textBot: {
    fontFamily: 'Inter-Regular',
    color: colors.text.primary,
  },
  textUser: {
    fontFamily: 'Inter-Regular',
    color: colors.text.primary,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: colors.text.muted,
    alignSelf: 'flex-end',
  },
});
