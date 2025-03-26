const usersRepository = require('./users-repository');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

const verifyHandler = async (email, password) => {
  const user = await usersRepository.findUserByEmail(email);
  if (!user) {
      throw new Error('INVALID_PASSWORD');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      throw new Error('INVALID_PASSWORD');
  }

  return { message: 'success' };
};

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  verifyHandler,
};
