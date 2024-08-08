export const getAuthzConfig = () => {
  return {
    host: process.env.AUTHZ_HOST_URL,
    client: "test-client",
    adminRole: "admin",

    getUrlFetchingAdminUser: function () {
      return `${this.host}/authz/clients/${this.client}/roles/${this.adminRole}/users`
    },
  }
}
