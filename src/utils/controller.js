// import AuthenticatedLayoutVue from "@/layouts/AuthenticatedLayout.vue";
import axios from "axios";
import moment from "moment";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";

let auth = getAuth();
const router = useRouter();

// let nabungs = ref([]);
let pocketss = ref([]);
let uangkeluar = ref(0);
let uangmasuk = ref(0);
let hasil = ref([]);

let tesowner = auth.currentUser.uid;
// console.log(tesowner);
let url =
  "https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
function checkIdPocket() {
  if (joinPocket.slug != "") {
    updatePocket();
  }
}

function createSlug() {
  if (namePocket.slug != "") {
    namePocket.slug = generateRandomText(10);
    createPocket();
  }
}

const namePocket = reactive({
  author: [auth.currentUser.uid],
  name: "",
  slug: generateRandomText(10),
});

const joinPocket = reactive({
  author: auth.currentUser.uid,
  slug: "",
});

// console.log(joinPocket.author);

function generateRandomText(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function updatePocket() {
  axios
    .get(
      "https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket.json",
      {
        params: {
          orderBy: '"slug"',
          equalTo: `"${joinPocket.slug}"`,
          auth: "FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r",
        },
      }
    )
    .then((result) => {
      let dataToUpdate = [];
      dataToUpdate = result.data;
      const id = Object.keys(dataToUpdate)[0];
      // console.log(id);

      // let jsonString = JSON.stringify(dataToUpdate);

      console.log(dataToUpdate);
      const newAuthor = joinPocket.author;
      dataToUpdate.author.push(newAuthor);
      axios
        .patch(
          `https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket/${id}/author.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r`,
          dataToUpdate.author
        )
        .then((patchResponse) => {
          console.log(patchResponse.data);
        })
        .catch((patchError) => {
          console.error(patchError);
        });
      //   let nab = Object.values(result.data).reverse();
      //   nabungs.value = result.data;
    })
    .catch((err) => {
      console.log(err.response);
    });
}

function createPocket() {
  //   console.log(paramkirim);
  axios
    .post(url, namePocket)
    .then(() => {
      alert("Transaction Successful");
      router.reload;
    })
    .catch((err) => {
      console.log(err.response);
    });
}

// onMounted(() => {
//   axios
//     .get(
//       "https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
//     )
//     .then((result) => {
//       //   console.log(tesowner);
//       //   pocketIds = Object.keys(result.data).reverse();
//       nabungs.value = result.data;
//     })
//     .catch((err) => {
//       console.log(err.response);
//     });
// });

onMounted(() => {
  axios
    .get(
      "https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
    )
    .then((result) => {
      let pockets = Object.values(result.data);

      // pocketsIds.forEach((pocket) => {
      //   console.log(pocket);
      // });
      pockets.forEach((pocket) => {
        let authors = Object.values(pocket.author);
        authors.forEach((author) => {
          if (author == tesowner) {
            let savings = Object.values(pocket.savings);
            let total = 0;
            let outmoney = 0;
            let inmoney = 0;
            pocketss.value = pocket.savings;
            console.log("hao");
            savings.forEach((saving) => {
              if (saving.transaction == "tarik") {
                outmoney += saving.nominal;
              }
              if (saving.transaction == "setor") {
                inmoney += saving.nominal;
              }
            });
            total = inmoney - outmoney;
            hasil.value.push({
              id: pocket.key,
              name: pocket.name,
              total: total,
              slug: pocket.slug,
            });
          }
        });
      });
      //   nabungs.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export {
  hasil,
  tesowner,
  rupiah,
  namePocket,
  joinPocket,
  pocketss,
  createPocket,
  createSlug,
  updatePocket,
  generateRandomText,
  // nabungs,
  checkIdPocket,
  uangkeluar,
  uangmasuk,
  router,
  moment,
};
