import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the modal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Modal Title',
    children: 'This is the modal content. You can add any elements here.',
  },
};

export const Small: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Small Modal',
    size: 'small',
    children: 'This is a small modal.',
  },
};

export const Large: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Large Modal',
    size: 'large',
    children: 'This is a large modal with more space for content.',
  },
};

export const NoCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: 'This modal has no close button. Press ESC to close.',
  },
};

export const WithForm: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Contact Form',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="text" placeholder="Name" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        <input type="email" placeholder="Email" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        <textarea placeholder="Message" rows={4} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        <Button>Submit</Button>
      </div>
    ),
  },
};