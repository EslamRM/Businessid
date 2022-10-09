export default function auth({ to, next, store }) {
  if (!localStorage.getItem("access_token")) {
    console.log(to.fullPath);
    if (to.fullPath === "/profile/name/000") {
      return next({
        name: "logIn",
        params: {
          redirectUrl: "/profilePage"
        }
      });
    }

    return next({
      name: "logIn",
      params: {
        redirectUrl: to.fullPath
      }
    });
  }
  return next();
}
