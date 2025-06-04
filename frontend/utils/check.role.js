let userRole;

if (typeof window !== 'undefined') {
  // ensures that we are at the client side, since window is undefined on the server side
  userRole = window.localStorage.getItem('currentRole');
}

export const isEditor = () => {
  return userRole === 'editor';
};

export const isExplorer = () => {
  return userRole === 'explorer';
};
