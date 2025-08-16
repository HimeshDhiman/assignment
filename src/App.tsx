import React, { useState } from "react";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";
import NavBar from "./components/navBar";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface Column {
  key: keyof User;
  label: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Himesh", email: "himesh@example.com", password: "12345" },
    { id: 2, name: "Rohit", email: "rohit@example.com", password: "abcde" },
    { id: 3, name: "Aman", email: "aman@example.com", password: "pass123" },
  ]);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const columns: Column[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // add new user
  const addUser = () => {
    if (!newName || !newEmail || !newPassword) return;

    const newUser: User = {
      id: users.length + 1,
      name: newName,
      email: newEmail,
      password: newPassword,
    };

    setUsers([...users, newUser]);
    setNewName("");
    setNewEmail("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
         
          <NavBar />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* Add User Form */}
        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Add New User
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <InputField
              label="Name"
              placeholder="Enter name"
              value={newName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewName(e.target.value)
              }
            />
            <InputField
              label="Email"
              placeholder="Enter email"
              value={newEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewEmail(e.target.value)
              }
            />
            <InputField
              label="Password"
              placeholder="Enter password"
              passwordToggle
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={addUser}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              ➕ Add User
            </button>
          </div>
        </section>

        {/* Search & Table */}
        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              User List
            </h3>
            <InputField
              label="Search"
              placeholder="Search by name or email"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="max-w-xs"
            />
          </div>

          <DataTable
            data={filteredUsers}
            columns={columns}
            caption="Registered Users"
            striped
            bordered
            hoverable
          />
        </section>
      </main>
    </div>
  );
}

export default App;
