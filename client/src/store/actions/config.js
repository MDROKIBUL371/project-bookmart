/*
 * Header config
 */

// eslint-disable-next-line import/prefer-default-export
export const headerConfig = (getState) => {
   const token = getState().auth.accessToken;
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   };
   if (token) {
      config.headers.Authorization = `${token}`;
   }
   return config;
};
