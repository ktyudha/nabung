<template>
  <AuthenticatedLayoutVue>
    <div class="container">
      <div class="col-md-6 mx-auto mb-3">
        <div class="card outline-tosca">
          <div class="card-body">
            <p class="fw-bolder te-tosca fs-4 text-capitalize">Tambah Pocket</p>
            <button
              type="button"
              name="pocket"
              class="btn outline-tosca te-tosca rounded-pill btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#pocketModal"
            >
              + Buat baru
            </button>
            <button
              type="button"
              name="pocketJoin"
              class="btn outline-tosca te-tosca rounded-pill btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#pocketJoinModal"
            >
              Gabung
            </button>
            <!-- <span class="fw-normal te-tosca fs-1">+</span> -->
          </div>
          <!-- <p>tes {{ index }}</p> -->
        </div>
      </div>
      <div class="mb-3" v-for="(pocket, index) in hasil" :key="pocket">
        <div class="col-md-6 mx-auto">
          <div class="card tosca border-0">
            <div class="card-body">
              <div class="d-flex">
                <div class="col-8">
                  <router-link
                    :to="'/pockets/' + pocket.slug"
                    class="text-decoration-none"
                  >
                    <span class="fw-bolder text-white fs-2 text-capitalize">
                      {{ pocket.name }}</span
                    ><br />

                    <span class="fw-normal text-white fs-6"
                      >{{ rupiah(pocket.total) }}
                    </span>
                  </router-link>
                </div>
                <div class="col-4 my-auto text-end">
                  <button
                    type="button"
                    name="pocket"
                    class="btn btn-outline-light text-white rounded-pill btn-sm me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#detPocketModal' + index"
                  >
                    ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          :id="'detPocketModal' + index"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header tosca">
                <h1
                  class="modal-title fs-5 text-capitalize text-white"
                  id="exampleModalLabel"
                >
                  Pocket {{ pocket.name }}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label" for="id">ID</label>
                  <span class="ms-4">{{ pocket.slug }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="pocketModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Tambah Pocket
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createSlug()">
                <div class="mb-3">
                  <label class="form-label" for="nominal">Nama Pocket</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="namePocket.name"
                    maxlength="15"
                    required
                  />
                </div>
                <button
                  class="btn tosca text-white w-100 mb-2 mt-1"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="pocketJoinModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Gabung Pocket
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="checkIdPocket()">
                <div class="mb-3">
                  <label class="form-label" for="id">ID</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="joinPocket.slug"
                    required
                  />
                </div>
                <button
                  class="btn tosca text-white w-100 mb-2 mt-1"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayoutVue>
</template>
      
<script>
import AuthenticatedLayoutVue from "@/layouts/AuthenticatedLayout.vue";
import axios from "axios";
import moment from "moment";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";

export default {
  name: "AuthenticatedLayout",
  components: {
    AuthenticatedLayoutVue,
  },
  setup() {
    let auth = getAuth();
    const router = useRouter();
    // console.log(auth);
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
      // console.log(joinPocket.slug);
      if (joinPocket.slug != "") {
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
            let data = Object.values(result.data);
            let thisSlug = "";
            data.forEach((inislug) => {
              // console.log(inislug.slug);
              thisSlug = inislug.slug;
            });

            if (thisSlug == joinPocket.slug) {
              updatePocket();
              console.log(joinPocket.slug);
            } else {
              alert("Please enter ID correctly!!");
            }
            // window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            // window.location.reload();
          });
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
    function isUserInArray(array, userToFind) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === userToFind) {
          return true; // Pengguna ditemukan dalam array
        }
      }
      return false; // Pengguna tidak ditemukan dalam array
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
          let dataToUpdate = Object.values(result.data);
          let dataReal = result.data;
          let dataUpdateUser = [];

          const id = Object.keys(dataReal)[0];

          const newAuthor = joinPocket.author;

          dataToUpdate.forEach((transactions) => {
            dataUpdateUser = transactions.author;
          });

          if (isUserInArray(dataUpdateUser, newAuthor)) {
            alert("User already registered on this pocket");
          } else {
            dataUpdateUser.push(newAuthor);
          }

          axios.patch(
            `https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket/${id}.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r`,
            { author: dataUpdateUser }
          );
          // .then((patchResponse) => {
          //   console.log(patchResponse.data);
          //   // window.location.reload();
          // })
          // .catch((patchError) => {
          //   console.error(patchError);
          // });
        })
        .catch((err) => {
          alert(`Join Pocket ${namePocket.name} Denied`);
          console.log(err);
        });
    }

    function createPocket() {
      axios
        .post(url, namePocket)
        .then(() => {
          alert(`Create Pocket ${namePocket.name} Successful`);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    onMounted(() => {
      axios
        .get(
          "https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
        )
        .then((result) => {
          // console.log(result.data);
          let pockets = Object.values(result.data);
          pockets.forEach((pocket) => {
            let authors = Object.values(pocket.author);
            authors.forEach((author) => {
              if (author == tesowner) {
                let savings;
                let total = 0;
                let outmoney = 0;
                let inmoney = 0;

                if (pocket.savings) {
                  savings = Object.values(pocket.savings);
                  savings.forEach((saving) => {
                    if (saving.transaction == "tarik") {
                      outmoney += saving.nominal;
                    }
                    if (saving.transaction == "setor") {
                      inmoney += saving.nominal;
                    }
                  });
                }
                pocketss.value = pocket.savings;
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
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
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
      checkIdPocket,
      uangkeluar,
      uangmasuk,
      router,
      moment,
    };
  },
};
</script>
  <style>
#app .tosca {
  /* color: #6acacd; */
  background-color: #6acacd;
}

#app .outline-tosca {
  border-color: #6acacd;
}
#app .te-tosca {
  color: #6acacd;
}
</style>
      