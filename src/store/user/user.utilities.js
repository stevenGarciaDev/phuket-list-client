import jwtDecode from 'jwt-decode';

export const getCurrentUser = jwt => {
    try {
    //   const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      return user;
    }
    catch (ex) {
      return null;
    }
  }