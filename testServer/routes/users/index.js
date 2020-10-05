const { makeProxy, prepareUrl } = require("../../libs");

module.exports = (app) => {
  makeProxy({ realServerUrl: "/api/users", expressMethodHandlerName: "get", handleUrl: "/api/users" }, app, {
    modifyResponse: ({ data, meta }) => {
      return {
        list: data.map((user) => ({
          id: user.id,
          user: {
            avatarReference: user.image ? prepareUrl(user.image.path) : null,
            name: user.name + " " + user.surname,
            reference: "/users/list/" + user.id,
          },
          position: user.position,
          email: user.email,
          status: user.active ? "Активный" : "Заблокирован",
          actions: [
            {
              mode: "button",
              icon: "edit",
              iconColor: "gray-blue/07",
              action: [
                {
                  type: "open-modal",
                  options: {
                    name: "edit-user-profile",
                  },
                },
              ],
            },
          ],
        })),
        pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
      };
    },
  });
  makeProxy({ realServerUrl: "/api/users", expressMethodHandlerName: "get", handleUrl: "/api/users-list" }, app, {
    modifyResponse: ({ data }) => {
      return data.map((user) => ({
        code: user.id,
        title: user.name + " " + user.surname,
        leftContent: user.image ? prepareUrl(user.image.path) : null,
        subTitle: `${user.position} • ${user.email}`,
      }));
    },
  });
  makeProxy(
    { realServerUrl: "/api/users/store", expressMethodHandlerName: "post", handleUrl: "/api/users/store" },
    app,
    {
      modifyResponse: ({ user }) => ({
        code: user.id,
        title: user.name + " " + user.surname,
        leftContent: user.image ? prepareUrl(user.image.path) : null,
        subTitle: `${user.position} • ${user.email}`,
      }),
    },
  );
};
