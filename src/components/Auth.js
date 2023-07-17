export const Authentication = {
    adminAuthenticated: false,
    userAuthenticated: false,
    adminLogin(callback) {
      Authentication.adminAuthenticated = true;
      callback();
    },
    userLogin(callback) {
      Authentication.userAuthenticated = true;
      callback();
    },
    logout(callback) {
      Authentication.adminAuthenticated = false;
      Authentication.userAuthenticated = false;
      callback();
    },
  };
  