// ----------------------------------------------------------------------
const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};

export const account = {
  displayName: `${storedProfile.lastName + storedProfile.firstName}`,
  email: `${storedProfile.email}`,
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
