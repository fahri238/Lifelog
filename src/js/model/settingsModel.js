export const userProfileModel = (username, role) => {
  const userProfile = {
    username: username,
    role: role,
  };

  localStorage.setItem("user", JSON.stringify(userProfile));
};

export const getUserProfile = () => {
  return JSON.parse(localStorage.getItem("user"));
};
