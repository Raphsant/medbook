import { useAuthStore } from "~/store/auth";

export default async function () {
  const authStore = useAuthStore();
  const user = JSON.parse(JSON.stringify(authStore.getUser));
  const { pending, data, error } = await useFetch(
    "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/getAllApts",
    {
      method: "GET",
      onRequest({ request, options }) {
        options.headers = {
          "x-access-token": user.token,
        };
      },
      onRequestError(context) {
        console.error(context.error.message);
      },
      onResponse(context) {
        console.log(context.response._data);
      },
      onResponseError(context) {},
    },
  );

  return { pending, data, error };
}
