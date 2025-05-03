export const onRedirectCallback = (appState, navigate) => {
  navigate(appState?.returnTo || window.location.pathname, { replace: true });
};
