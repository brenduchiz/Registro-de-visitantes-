firebase.initializeApp({
  apiKey: 'AIzaSyBgC8VSVMtFdRtd0fGVxQVTG_DQskngoUw',
  authDomain: 'registrovisitantes-8986e.firebaseapp.com',
  databaseURL: 'https://registrovisitantes-8986e.firebaseio.com',
  projectId: 'registrovisitantes-8986e',
  storageBucket: 'registrovisitantes-8986e.appspot.com',
  messagingSenderId: '1028781408688'
});
  
// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();