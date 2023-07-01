<template>
  <AuthenticatedLayoutVue>
    <div class="container">
      <div class="text-center"></div>

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
              <p class="text-end fw-bold" v-if="nbg.transaction == 'setor'">
                {{ rupiah(nbg.nominal) }}
              </p>
              <p class="text-end fw-bold text-danger" v-else>
                - {{ rupiah(nbg.nominal) }}
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
            <div class="modal-header tosca">
              <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
                Setor
              </h1>
              <button
                type="button"
                class="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="store()">
                <div class="mb-3">
                  <label class="form-label" for="nominal"
                    >Nominal<span class="text-secondary" style="font-size: 8px"
                      >(exp 150000)</span
                    ></label
                  >
                  <input
                    type="number"
                    class="form-control"
                    v-model="nabung.nominal"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="subject"
                    >Subject
                    <span class="text-secondary" style="font-size: 8px"
                      >(Mutasi)</span
                    ></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="nabung.subject"
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
        id="tarikModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header tosca">
              <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
                Tarik
              </h1>
              <button
                type="button"
                class="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="store()">
                <div class="mb-3">
                  <label class="form-label" for="nominal"
                    >Nominal
                    <span class="text-secondary" style="font-size: 8px"
                      >(exp 150000)</span
                    ></label
                  >
                  <input
                    type="number"
                    class="form-control"
                    v-model="nabung.nominal"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="subject"
                    >Subject
                    <span class="text-secondary" style="font-size: 8px"
                      >(Makan)</span
                    >
                  </label>

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
                  class="btn tosca text-white w-100 mb-2 mt-1"
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

      <!-- Detail modal -->
      <div
        class="modal fade"
        id="detailModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header tosca">
              <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
                Detail
              </h1>
              <button
                type="button"
                class="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label" for="nominal">Pengeluaran</label>
                <p class="fs-6 fw-bold text-danger w-100">
                  - {{ rupiah(uangkeluar) }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label" for="subject">Pemasukan</label>
                <p class="fs-6 fw-bold text-success w-100">
                  + {{ rupiah(uangmasuk) }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label" for="subject">Saldo</label>
                <p class="fs-6 fw-bold w-100">{{ rupiah(saldo) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar fixed-bottom bg-white">
        <div class="container">
          <span class="te-tosca d-flex" style="font-size: 14px"
            >Pengeluaran</span
          >
        </div>
        <div class="container">
          <button
            type="button"
            name="detail"
            class="btn tosca text-white rounded-pill btn-sm me-2"
            data-bs-toggle="modal"
            data-bs-target="#detailModal"
            @click="setTransaction('detail')"
          >
            <span class="fs-6 fw-bold w-100">{{ rupiah(uangkeluar) }}</span>
          </button>

          <div>
            <button
              type="button"
              name="setor"
              class="btn outline-tosca te-tosca rounded-pill btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#setorModal"
              @click="setTransaction('setor')"
            >
              Setor
            </button>
            <button
              type="button"
              name="tarik"
              class="btn tosca text-white rounded-pill btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#tarikModal"
              @click="setTransaction('tarik')"
            >
              Tarik
            </button>
          </div>
        </div>
      </nav>
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
    let uangkeluar = ref(0);
    let uangmasuk = ref(0);
    let saldo = ref(0);
    // let owner = auth.currentUser.uid;
    const idpocket = router.currentRoute.value.params.id;
    // let url =
    ("https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket${idpocket}.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r");

    const nabung = reactive({
      author: auth.currentUser.displayName,
      nominal: 0,
      transaction: "",
      subject: "",
      created_at: today,
    });

    const rupiah = (number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    };

    function setTransaction(obj) {
      nabung.transaction = obj;
    }

    function store() {
      console.log(nabung);
      axios
        .post(
          `https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket/${idpocket}/savings.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r`,
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
      console.log(idpocket);
    });
    onMounted(() => {
      axios
        .get(
          `https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket/${idpocket}/savings.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r`
        )
        .then((result) => {
          console.log(result);
          let nab = Object.values(result.data).reverse();
          nabungs.value = nab;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
    onMounted(() => {
      axios
        .get(
          `https://celenga-berkah-default-rtdb.firebaseio.com/gatherpocket/${idpocket}/savings.json?auth=FV1QI4yiFP6KD1OIv9T6cX2y5LLoh3SwyHzy2F0r`
        )
        .then((result) => {
          var pemasukan = 0;
          var pengeluaran = 0;
          for (var key in result.data) {
            if (result.data[key].transaction == "setor") {
              pemasukan += result.data[key].nominal;
            }
            if (result.data[key].transaction == "tarik") {
              pengeluaran += result.data[key].nominal;
            }
          }
          uangkeluar.value = pengeluaran;
          uangmasuk.value = pemasukan;
          saldo.value = pemasukan - pengeluaran;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
    return {
      rupiah,
      // checkpocket,
      nabungs,
      saldo,
      nabung,
      uangkeluar,
      uangmasuk,
      router,
      moment,
      store,
      setTransaction,
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
    