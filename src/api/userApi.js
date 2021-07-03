import firebase from "firebase/app";
import "firebase/auth";

const userApi = {
  getMe: () => {
    // Call API
    return new Promise((resolve, reject) => {
      // Wait 500ms --> return result
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
        });
      }, 500);
    });
  },
};

export default userApi;
