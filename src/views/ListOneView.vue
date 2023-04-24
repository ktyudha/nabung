<template>
  <AuthenticatedLayoutVue>
    <div class="list container">
      <div class="row mt-4">
        <div class="col-6">
          <button
            type="button"
            name="setor"
            class="btn btn-primary mr-2"
            data-bs-toggle="modal"
            data-bs-target="#setorModal"
            @click="setTransaction(1)"
          >
            Setor
          </button>
          <button
            type="button"
            name="tarik"
            class="btn btn-primary mx-2"
            data-bs-toggle="modal"
            data-bs-target="#tarikModal"
            @click="setTransaction(2)"
          >
            Tarik
          </button>
        </div>
        <div class="col-6">
          <div class="my-auto">
            <span class="fw-bold">Saldo : </span>
            <template v-for="(sld, index) in saldo.data" :key="index">
              <span class="fs-6">Rp {{ sld }}</span>
            </template>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="mb-3" v-for="(nabung, index) in nabungs.data" :key="index">
          <span class="fw-semibold opacity-50" style="font-size: 12px">{{
            nabung.created_at
          }}</span>
          <div class="row mt-1">
            <div class="col-6">
              <span class="fw-semibold text-capitalize">{{
                nabung.subject
              }}</span>
              <p class="mb-0 text-secondary" style="font-size: 10px">
                Transaksi
                <span class="text-capitalize">{{
                  nabung.transaction.name
                }}</span>
                oleh
                <span class="text-capitalize">{{ nabung.user.name }}</span>
              </p>
            </div>
            <div class="col-6">
              <p
                class="text-end text-success fw-bold"
                v-if="nabung.transaction.name == 'setor'"
              >
                + Rp {{ nabung.nominal }}
              </p>
              <p class="text-end fw-bold" v-else>- Rp {{ nabung.nominal }}</p>
            </div>
          </div>
        </div>
        <!-- <table class="table table-striped my-3 rounded">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nominal</th>
              <th scope="col">Transaction</th>
              <th scope="col">Saldo</th>
              <th scope="col">Time</th>
              <th scope="col">Author</th>
              <th scope="col">Subject</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(nabung, index) in nabungs.data" :key="index">
              <td scope="row">{{ index++ }}</td>
              <td scope="row">{{ nabung.nominal }}</td>
              <td scope="row" class="text-capitalize">
                {{ nabung.transaction.name }}
              </td>
              <td scope="row">{{ nabung.saldo }}</td>
              <td scope="row">
                {{ nabung.created_at }}
              </td>
              <td scope="row" class="text-capitalize">
                {{ nabung.user.name }}
              </td>
              <td scope="row" class="text-capitalize">{{ nabung.subject }}</td>
            </tr>
          </tbody>
        </table> -->
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
                    type="text"
                    class="form-control"
                    v-model="nabung.nominal"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="subject">Keterangan</label>
                  <select
                    class="form-select"
                    name="subject"
                    id="subject"
                    v-model="nabung.subject"
                    required
                  >
                    <option selected disabled>-- Pilih Subject --</option>
                    <option value="nabung">Nabung rutin</option>
                    <option value="job">Job</option>
                    <option value="uang lebih">Uang lebih</option>
                  </select>
                </div>
                <div class="mb-3 text-end">
                  <button class="btn btn-dark">Save</button>
                </div>
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
                    type="text"
                    class="form-control"
                    v-model="nabung.nominal"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="subject">Subject</label>
                  <select
                    class="form-select"
                    name="subject"
                    id="subject"
                    v-model="nabung.subject"
                    required
                  >
                    <option selected disabled>-- Pilih Subject --</option>
                    <option value="makan">Makan</option>
                    <option value="jalan-jalan">Jalan-jalan</option>
                    <option value="staycation">Staycation</option>
                    <option value="keperluan lain">Keperluan lain</option>
                  </select>
                </div>
                <div class="mb-3 text-end">
                  <button class="btn btn-dark">Save</button>
                </div>
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
import AuthenticatedLayoutVue from "@/layouts/AuthenticatedLayout.vue";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  components: {
    AuthenticatedLayoutVue,
  },
  setup() {
    const nabung = reactive({
      nominal: 0,
      transaction_id: 0,
      subject: "",
      user_id: 0,
      saldo: 0,
    });
    let nabungs = ref([]);
    let saldo = ref([]);

    const router = useRouter();
    function setTransaction(obj) {
      nabung.transaction_id = obj;
      // console.log(nabung.transaction_id);
    }
    function store() {
      // console.log(event);
      axios
        .post("http://nabung-api.test/api/banks", nabung)
        .then(() => {
          // console.log(event);
          alert("Setor Successful");
          router.push({
            name: "nabung.list",
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
    onMounted(() => {
      axios
        .get("http://nabung-api.test/api/banks")
        .then((result) => {
          nabungs.value = result.data;
          // console.log(events.value);
        })
        .catch((err) => {
          console.log(err.response);
          // console.log("Login please");
        });
    });
    onMounted(() => {
      axios
        .get("http://nabung-api.test/api/getsaldo")
        .then((result) => {
          saldo.value = result.data;
          // console.log(saldo.value);
        })
        .catch((err) => {
          console.log(err.response);
          // console.log("Login please");
        });
    });
    return {
      nabungs,
      nabung,
      saldo,
      router,
      store,
      setTransaction,
    };
  },
};
</script>
    