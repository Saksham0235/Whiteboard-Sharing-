const users = [];

//For adding users to the list

const addUser = ({ name, roomId, userId, host, presenter }) => {
  const user = { name, userId,roomId, host, presenter };
  users.push(user);

  return users.filter((user)=>user.roomId===roomId)
};

// Removing user from the list

const removeUser = (id) => {
  const index = users.findIndex((user) => user.userId === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// GEt a user from the list

const getUser = (id) => {
  return users.find((user) => user.userId === id);
};

// Get all users

const getAllUsers = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

module.exports = {
  addUser,
  removeUser,
  getAllUsers,
  getUser,
};
