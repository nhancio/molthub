import { ImageSourcePropType } from 'react-native';

export interface SetupStep {
  id: number;
  title: string;
  description: string;
  details?: string;
  image?: ImageSourcePropType;
}

export const cloudSteps: SetupStep[] = [
  {
    id: 1,
    title: 'Create AWS Account',
    description:
      'Go to aws.amazon.com and create a free-tier account. You will need an email address and a credit/debit card for verification. The free tier includes 750 hours of t2.micro instance usage per month.',
    image: require('@/assets/images/cloud/1.jpeg'),
  },
  {
    id: 2,
    title: 'Open EC2 Dashboard',
    description:
      'In the AWS Console, search for "EC2" in the top search bar and click on the EC2 service. This is where you will manage your virtual servers.',
    image: require('@/assets/images/cloud/2.jpeg'),
  },
  {
    id: 3,
    title: 'Launch Instance',
    description:
      'Click the orange "Launch Instance" button in the EC2 dashboard. This starts the process of creating your cloud server.',
    image: require('@/assets/images/cloud/3.jpeg'),
  },
  {
    id: 4,
    title: 'Choose Instance Type',
    description:
      'Select "t2.micro" for the free tier, or "t3.small" for better performance. Name your instance "MoltBot-Server" for easy identification.',
    image: require('@/assets/images/cloud/4.jpeg'),
  },
  {
    id: 5,
    title: 'Create Key Pair',
    description:
      'Create a new key pair and download the .pem file. Store it in a safe location — you will need it to connect to your server. Never share this file.',
    image: require('@/assets/images/cloud/5.jpeg'),
  },
  {
    id: 6,
    title: 'Launch Server',
    description:
      'Review your settings and click "Launch Instance". Wait for the instance state to change to "Running" — this usually takes 1-2 minutes.',
    image: require('@/assets/images/cloud/6.jpeg'),
  },
  {
    id: 7,
    title: 'Connect to Server',
    description:
      'Click on your instance, then click "Connect". Use the SSH client option with your downloaded key pair file to access the terminal.',
    image: require('@/assets/images/cloud/7.jpeg'),
  },
  {
    id: 8,
    title: 'Copy Install Command',
    description:
      'Copy the MoltBot installation command from the official docs. The one-line installer will handle all dependencies automatically.',
    image: require('@/assets/images/cloud/8.jpeg'),
  },
  {
    id: 9,
    title: 'Paste in Terminal',
    description:
      'Paste the install command into your server terminal and press Enter. The installation process will begin — this typically takes 2-3 minutes.',
    image: require('@/assets/images/cloud/9.jpeg'),
  },
  {
    id: 10,
    title: 'Choose Onboarding Mode',
    description:
      'When prompted, select "Quickstart" for the fastest setup. This pre-configures common settings and gets you running in minutes.',
    image: require('@/assets/images/cloud/10.jpeg'),
  },
  {
    id: 11,
    title: 'Choose AI Model',
    description:
      'Select "Anthropic" as your AI model provider. Claude offers the best balance of capability and cost for MoltBot operations.',
    image: require('@/assets/images/cloud/11.jpeg'),
  },
  {
    id: 12,
    title: 'Get API Key',
    description:
      'Visit platform.claude.com to create an account and generate an API key. Copy the key — you will paste it in the next configuration step.',
    image: require('@/assets/images/cloud/12.jpeg'),
  },
  {
    id: 13,
    title: 'Connect Channel',
    description:
      'Choose your messaging platform: Telegram, WhatsApp, or Discord. Follow the on-screen instructions to connect your bot to the selected channel.',
    image: require('@/assets/images/cloud/13.jpeg'),
  },
  {
    id: 14,
    title: 'Configure Skills',
    description:
      'When asked "Enable default skills?", select Yes. This activates built-in capabilities like web search, image generation, and code execution.',
    image: require('@/assets/images/cloud/14.jpeg'),
  },
  {
    id: 15,
    title: 'Choose Node Manager',
    description:
      'Select "Bun" as your Node.js runtime manager. It is significantly faster than npm/yarn and comes with built-in TypeScript support.',
    image: require('@/assets/images/cloud/15.jpeg'),
  },
  {
    id: 16,
    title: 'Setup Complete!',
    description:
      'Congratulations! Your MoltBot instance is now running on AWS. You can start chatting with your bot through the connected channel.',
    image: require('@/assets/images/cloud/16.jpeg'),
  },
];
