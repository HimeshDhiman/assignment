import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

interface Person {
  id: number;
  name: string;
  email: string;
}

const sampleData: Person[] = [
  { id: 1, name: "Himesh", email: "himesh@example.com" },
  { id: 2, name: "Rohit", email: "rohit@example.com" },
  { id: 3, name: "Aman", email: "aman@example.com" },
];

// 👇 fixed columns type
const columns: { key: keyof Person; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable<Person>,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<Person>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const Striped: Story = {
  args: {
    data: sampleData,
    columns,
    striped: true,
  },
};

export const Bordered: Story = {
  args: {
    data: sampleData,
    columns,
    bordered: true,
  },
};

export const Hoverable: Story = {
  args: {
    data: sampleData,
    columns,
    hoverable: true,
  },
};

export const WithCaption: Story = {
  args: {
    data: sampleData,
    columns,
    caption: "User List",
    bordered: true,
    striped: true,
    hoverable: true,
  },
};
