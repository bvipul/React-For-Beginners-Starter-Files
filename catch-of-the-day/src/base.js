import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBEBcnfMq5OSBML4lotbFZ3GaJzMdLhCaE",
    authDomain: "cotd-bvipul.firebaseapp.com",
    databaseURL: "https://cotd-bvipul.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;