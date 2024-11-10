// /server/models/userModel.js

// Example in-memory store for users
let users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',  // In real applications, passwords should be hashed
    resetToken: null,
    resetTokenExpiry: null,
  }
];

// Function to find a user by email (for demo purposes)
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Function to update user details (e.g., resetting password)
const updateUser = (email, data) => {
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...data };
    return users[userIndex];
  }
  return null;
};

module.exports = {
  findUserByEmail,
  updateUser,
};
