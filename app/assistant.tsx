import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Send, Image as ImageIcon } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import ChatBubble, { ChatMessage } from '@/components/ChatBubble';
import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  text: "Hi! I'm your MoltBot setup assistant. How can I help you today?",
  isBot: true,
  timestamp: new Date(),
};

const BOT_RESPONSES: Record<string, string> = {
  aws: 'For AWS setup, start by creating a free-tier account at aws.amazon.com. Then navigate to EC2 and launch a t2.micro instance. Need more detailed guidance on any specific step?',
  api: 'You can get your Anthropic API key from platform.claude.com. Create an account, go to API Keys, and generate a new key. Keep it secure and never share it publicly.',
  telegram:
    'To connect Telegram, create a bot via @BotFather, get your bot token, and paste it during the MoltBot channel setup step. The bot will automatically start listening for messages.',
  discord:
    'For Discord integration, create a bot in the Discord Developer Portal, copy the bot token, and use it during the channel connection step in MoltBot setup.',
  whatsapp:
    'WhatsApp integration requires a WhatsApp Business API account. During setup, MoltBot will guide you through connecting your WhatsApp number.',
  error:
    'If you are experiencing errors, try restarting the installation process. Make sure your server has at least 1GB RAM and Node.js v18+ installed. Share the error message for more specific help.',
  bun: 'Bun is the recommended runtime for MoltBot. Install it with: curl -fsSL https://bun.sh/install | bash. It is much faster than npm for package management.',
  help: "I can help you with AWS setup, API keys, channel connections (Telegram, Discord, WhatsApp), troubleshooting errors, and general MoltBot configuration. What would you like to know?",
};

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const [keyword, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(keyword)) {
      return response;
    }
  }
  return "Thanks for your question! I'll do my best to help. Could you provide more details about what you need assistance with? You can ask about AWS setup, API keys, channel connections, or troubleshooting.";
}

export default function AssistantChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: trimmed,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(trimmed),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.safeArea}>
          <View style={styles.topBar}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={colors.text.primary} />
            </Pressable>
            <View style={styles.topTitleBlock}>
              <Text style={styles.topTitle}>MoltBot Setup AI</Text>
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.backButton} />
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.inputBar}>
            <Pressable style={styles.imageButton}>
              <ImageIcon size={20} color={colors.text.muted} />
            </Pressable>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={colors.text.muted}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable
              style={({ pressed }) => [
                styles.sendButton,
                inputText.trim() ? styles.sendButtonActive : null,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Send
                size={18}
                color={
                  inputText.trim() ? colors.text.primary : colors.text.muted
                }
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: 56,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  topTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: colors.text.primary,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  messageList: {
    paddingVertical: spacing.lg,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  imageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: colors.input,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: spacing.md,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.text.primary,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.accent,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
