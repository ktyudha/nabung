<template>
  <AuthenticatedLayoutVue>
    <div class="list container">
      <div class="mb-3 text-center">
        <span class="fw-bold">Saldo</span><br />
        <span class="fs-6 fw-semibold">Rp {{ saldo }}</span>
      </div>
      <div class="text-center">
        <button
          type="button"
          name="setor"
          class="btn btn-dark rounded-pill btn-sm mr-2"
          data-bs-toggle="modal"
          data-bs-target="#setorModal"
          @click="setTransaction('setor')"
        >
          Setor
        </button>
        <button
          type="button"
          name="tarik"
          class="btn btn-dark rounded-pill btn-sm mx-2"
          data-bs-toggle="modal"
          data-bs-target="#tarikModal"
          @click="setTransaction('tarik')"
        >
          Tarik
        </button>
      </div>

      <div class="mt-1">
        <div class="mb-3" v-for="(nbg, index) in nabungs" :key="index">
          <span class="fw-semibold opacity-50" style="font-size: 12px">{{
            moment(nbg.created_at).format("ll")
          }}</span>
          <div class="row mt-1">
            <div class="col-6">
              <span class="fw-semibold text-capitalize">{{ nbg.subject }}</span>
              <p class="mb-0 text-secondary" style="font-size: 10px">
                Transaksi
                <span class="text-capitalize">{{ nbg.transaction }}</span>
                oleh
                <span class="text-capitalize">{{ nbg.author }}</span>
              </p>
            </div>
            <div class="col-6">
              <p
                class="text-end text-success fw-bold"
                v-if="nbg.transaction == 'setor'"
              >
                + Rp {{ nbg.nominal }}
              </p>
              <p class="text-end fw-bold text-danger" v-else>
                - Rp {{ nbg.nominal }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="setorModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Setor</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="store()">
                <div class="mb-3">
                  <label class="form-label" for="nominal">Nominal</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="nabung.nominal"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="subject">Subject</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="nabung.subject"
                    required
                  />
                </div>
                <button
                  class="btn btn-dark w-100 mb-2 mt-1"
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
        id="tarikModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Tarik</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="store()">
                <div class="mb-3">
                  <label class="form-label" for="nominal">Nominal</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="nabung.nominal"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="subject">Subject</label>

                  <input
                    type="text"
                    class="form-control"
                    v-model="nabung.subject"
                    maxlength="15"
                    required
                  />
                </div>
                <!-- <div class="mb-3 text-end"> -->
                <button
                  class="btn btn-dark w-100 mb-2 mt-1"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Save
                </button>
                <!-- </div> -->
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
import "vue3-carousel/dist/carousel.css";

export default {
  name: "HistoryOneViewVue",
  components: {
    AuthenticatedLayoutVue,
  },
  setup() {
    let today = Date.now();
    let auth = getAuth();
    const router = useRouter();
    let nabungs = ref([]);
    let saldo = ref(0);

    const nabung = reactive({
      nominal: 0,
      transaction: "",
      subject: "",
      author: auth.currentUser.displayName,
      created_at: today,
    });

    function setTransaction(obj) {
      nabung.transaction = obj;
    }
    function store() {
      axios
        .post(
          "https://celenga-berkah-default-rtdb.firebaseio.com/job.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r",
          nabung
        )
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
          "https://celenga-berkah-default-rtdb.firebaseio.com/job/.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
        )
        .then((result) => {
          let nab = Object.values(result.data);
          nabungs.value = nab;
          // nabungs.value = result.data;
          // console.log(nab);
          // console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
    onMounted(() => {
      axios
        .get(
          "https://celenga-berkah-default-rtdb.firebaseio.com/job.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r"
        )
        .then((result) => {
          var totalSaldo = 0;
          var pengeluaran = 0;
          for (var key in result.data) {
            if (result.data[key].transaction == "setor") {
              totalSaldo += result.data[key].nominal;
            }
            if (result.data[key].transaction == "tarik") {
              pengeluaran += result.data[key].nominal;
            }
          }
          saldo.value = totalSaldo - pengeluaran;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
    return {
      nabungs,
      nabung,
      saldo,
      router,
      moment,
      store,
      setTransaction,
    };
  },
};
</script>
      