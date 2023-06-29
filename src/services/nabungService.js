import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getAuth } from "firebase/auth";

// const url =
//   "https://celenga-berkah-default-rtdb.firebaseio.com/banks/" +
//   getAuth().currentUser.uid +
//   ".json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r";
// const auth = getAuth();
const router = useRouter();

class nabungService {
  getUsers() {
    const auth = getAuth();
    return auth.currentUser.uid;
  }
  getTabunganByUser() {
    const saldoByUser = ref([]);
    axios
      .get(
        "https://celenga-berkah-default-rtdb.firebaseio.com/banks/" +
          getAuth().currentUser.uid +
          ".json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
      )
      .then((result) => {
        saldoByUser.value = result.data;
      })
      .catch((err) => {
        console.log(err.response);
        // console.log("Login please");
      });
    return saldoByUser;
  }
  getSaldo() {
    let saldo = ref(0);
    axios
      .get(
        "https://celenga-berkah-default-rtdb.firebaseio.com/banks/" +
          getAuth().currentUser.uid +
          ".json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
      )
      .then((result) => {
        var totalSaldo = 0;
        for (var key in result.data) {
          totalSaldo += result.data[key].nominal;
        }
        saldo.value = totalSaldo;
      })
      .catch((err) => {
        console.log(err.response);
      });
    return saldo;
  }
  create(nabung) {
    axios
      .post(
        "https://celenga-berkah-default-rtdb.firebaseio.com/banks/" +
          getAuth().currentUser.uid +
          ".json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r",
        nabung
      )
      .then(() => {
        alert("Transaction Successful");
        router.push({ name: "nabung.history" });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
}

export default new nabungService();
