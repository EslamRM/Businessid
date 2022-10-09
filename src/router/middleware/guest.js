export default function guest({ next, store }) {
  if (localStorage.getItem("access_token")) {
    return next({
      name: "appHome"
    });
  }

  return next();
}
