<template>
  <AuthenticatedLayoutVue>
    <div class="container">
      <div class="mb-3" v-for="(pocket, index) in hasil" :key="index">
        <div class="col-md-6 mx-auto">
          <div class="card tosca border-0">
            <div class="card-body">
              <div class="d-flex">
                <div class="col-8">
                  <router-link
                    :to="'/pockets/' + index"
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
            <!-- <p>tes {{ index }}</p> -->
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
                  Detail {{ pocket.name }}
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

      <div class="col-md-6 mx-auto">
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
// @ is an alias to /src
import moment from "moment";
import AuthenticatedLayoutVue from "@/layouts/AuthenticatedLayout.vue";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";

export default {
  name: "PocketsOneView",
  components: {
    AuthenticatedLayoutVue,
  },
  setup() {
    let auth = getAuth();
    const router = useRouter();

    let nabungs = ref([]);
    let pocketss = ref([]);
    let uangkeluar = ref(0);
    let uangmasuk = ref(0);
    let hasil = ref([]);

    let tesowner = auth.currentUser.uid;
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
          const dataToUpdate = result.data;
          const id = Object.keys(dataToUpdate)[0];
          //   console.log(id);
          const newAuthor = {
            1: joinPocket.author,
          };
          axios
            .patch(
              `https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket/${id}/author.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r`,
              newAuthor
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

    onMounted(() => {
      axios
        .get(
          "https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
        )
        .then((result) => {
          //   console.log(tesowner);
          //   pocketIds = Object.keys(result.data).reverse();
          nabungs.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    onMounted(() => {
      axios
        .get(
          "https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket.json",
          {
            params: {
              //   orderBy: '"author"',
              //   equalTo: `"${"UED2FNRk1F"}"`,
              auth: "FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r",
            },
          }
        )
        .then((result) => {
          //   console.log(result.data);
          let pockets = Object.values(result.data).reverse();

          pockets.forEach((pocket) => {
            let authors = Object.values(pocket.author);
            authors.forEach((author) => {
              if (author == tesowner) {
                let savings = Object.values(pocket.savings);
                let total = 0;
                let outmoney = 0;
                let inmoney = 0;
                pocketss.value = pocket.savings;
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
          console.log(err.response);
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
      nabungs,
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
      