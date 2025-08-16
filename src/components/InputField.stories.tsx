import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
  },
};

export const WithHelper: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "We will not share your email.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    errorMessage: "This field is required",
  },
};

export const PasswordField: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    passwordToggle: true,
  },
};

export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
    clearable: true,
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Input",
    placeholder: "Please wait...",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Can't type here",
    disabled: true,
  },
};
