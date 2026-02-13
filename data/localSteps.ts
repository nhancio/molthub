import { SetupStep } from './cloudSteps';

export const localSteps: SetupStep[] = [
  {
    id: 1,
    title: 'Install Node.js',
    description:
      'Download and install Node.js (v18 or higher) from nodejs.org. Verify the installation by running "node --version" in your terminal.',
    image: require('@/assets/images/local/1.jpeg'),
  },
  {
    id: 2,
    title: 'Run Install Command',
    description:
      'Open your terminal and run: curl -fsSL https://molt.bot/install.sh | bash. This one-line installer will automatically detect your system and install all dependencies.',
    image: require('@/assets/images/local/2.jpeg'),
  },
  {
    id: 3,
    title: 'Accept Security & Choose Mode',
    description:
      'Review the security notice and choose "Yes" to continue. Select "QuickStart" for the fastest setup with pre-configured settings.',
    image: require('@/assets/images/local/3.jpeg'),
  },
  {
    id: 4,
    title: 'Select AI Provider',
    description:
      'Choose your preferred AI model provider. OpenAI and Anthropic are recommended. You can also select OpenRouter for access to multiple models.',
    image: require('@/assets/images/local/4.jpeg'),
  },
  {
    id: 5,
    title: 'Run Health Check',
    description:
      'Run "clawdbot health" in your terminal to verify the bot is running correctly. You should see the version, active agents, heartbeat interval, and session store status.',
    image: require('@/assets/images/local/5.jpeg'),
  },
  {
    id: 6,
    title: 'Check Bot Health',
    description:
      'Confirm the health output shows your agent as "main (default)" with a heartbeat interval and session store path. A green indicator means everything is running smoothly.',
    image: require('@/assets/images/local/6.jpeg'),
  },
  {
    id: 7,
    title: 'Select Channel',
    description:
      'Choose your messaging platform from the list. Telegram (Bot API) is the easiest to get started with. Other options include WhatsApp, Discord, Signal, Slack, and more.',
    image: require('@/assets/images/local/7.jpeg'),
  },
  {
    id: 8,
    title: 'Approve Pairing',
    description:
      'Run "clawdbot pairing approve telegram <token>" with your bot token to link your messaging channel. Replace the token with the one you received from BotFather or your channel provider.',
    image: require('@/assets/images/local/8.jpeg'),
  },
  {
    id: 9,
    title: 'Start Gateway',
    description:
      'Run "clawdbot gateway" to start the gateway server. You should see it listening on ws://127.0.0.1:18789 with the browser control panel available at a separate port.',
    image: require('@/assets/images/local/9.jpeg'),
  },
  {
    id: 10,
    title: 'Setup Complete!',
    description:
      'Open the Clawdbot Gateway Dashboard in your browser. You can chat directly with your bot, manage channels, configure skills, and monitor sessions from the control panel.',
    image: require('@/assets/images/local/10.jpeg'),
  },
];
