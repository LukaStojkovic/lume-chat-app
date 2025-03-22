// import { io } from "socket.io-client";

// const BASE_URL = "http://localhost:3000";

// class SocketClient {
//   socket;

//   connect(userId) {
//     this.socket = io.connect(BASE_URL, { query: { userId } });
//     return new Promise((resolve, reject) => {
//       this.socket.on("connect", () => resolve());
//       this.socket.on("connect_error", (error) => reject(error));
//     });
//   }

//   disconnect() {
//     return new Promise((resolve) => {
//       this.socket.disconnect(() => {
//         this.socket = null;
//       });

//       resolve();
//     });
//   }

//   emit(event, data) {
//     return new Promise((resolve, reject) => {
//       if (!this.socket) return reject("No socket connection.");

//       return this.socket.emit(event, data, (response) => {
//         if (response.error) {
//           console.error(response.error);
//           return reject(response.error);
//         }

//         return resolve();
//       });
//     });
//   }

//   on(event, fun) {
//     return new Promise((resolve, reject) => {
//       if (!this.socket) return reject("No socket connection.");

//       this.socket.on(event, fun);
//       resolve();
//     });
//   }
// }

// export default SocketClient;
