import { useAuthStore } from "~/store/auth";
import type { User } from "~/ts/interfaces/User";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated, user, token } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const cookieToken = useCookie('token'); // get token from cookies
  const cookieUser = useCookie('user') as Ref<User>; // get user from cookies

  const notLoggedInRoutes = ['login', 'register', 'imprint', 'privacy', 'about', 'tos'];

  if (cookieToken.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
    // Parse the user from the cookie and set it to the state
    user.value = cookieUser.value ? cookieUser.value as User : null;
    token.value = cookieToken.value || null; // update the token state
  }

  // allow navigation to not logged in routes
  if (notLoggedInRoutes.includes(to?.name)) {
    return;
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && notLoggedInRoutes.includes(to?.name)) {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && (to?.name !== 'login')) {
    abortNavigation();
    return navigateTo('/login');
  }
});