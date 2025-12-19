import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: 'The shadow elevation of the card',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle',
    children: 'This is the card content. You can add any elements here.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Beautiful Landscape',
    subtitle: 'Nature photography',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    imageAlt: 'Mountain landscape',
    children: 'Experience the beauty of nature with stunning mountain views.',
  },
};

export const Hoverable: Story = {
  args: {
    title: 'Hoverable Card',
    subtitle: 'Hover over me!',
    hoverable: true,
    children: 'This card has hover effects. Try hovering over it!',
  },
};

export const HighElevation: Story = {
  args: {
    title: 'High Elevation',
    subtitle: 'With strong shadow',
    elevation: 'high',
    children: 'This card has a high elevation with a strong shadow effect.',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click me!',
    hoverable: true,
    onClick: () => alert('Card clicked!'),
    children: 'This card is clickable and has hover effects.',
  },
};

export const ContentOnly: Story = {
  args: {
    children: 'A simple card with only content, no title or subtitle.',
  },
};