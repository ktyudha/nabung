<template>
  <AuthenticatedLayoutVue>
    <div class="container">
      <div class="row mt-2">
        <div class="mb-3">
          <div class="p-3 text-white bg-warning rounded">
            <div class="card-body">
              <h5 class="fw-bold text-start fs-1">SALDO</h5>
              <!-- <p class="card-text text-start">
                Kalau punya uang segera ditabung!!
              </p> -->
              <template v-for="(sld, index) in saldo.data" :key="index">
                <p class="fs-3 mb-0 fw-bold bg-warning">Rp {{ sld }}</p>
              </template>
            </div>
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <button
            type="button"
            name="setor"
            class="btn btn-success w-100"
            data-bs-toggle="modal"
            data-bs-target="#setorModal"
            @click="setTransaction(1)"
          >
            <div class="py-3 text-white">
              <div class="card-body">
                <h5 class="fw-bold text-start fs-1">SETOR</h5>
                <p class="card-text text-start">
                  Kalau punya uang segera ditabung!!
                </p>
              </div>
            </div>
          </button>
        </div>
        <div class="col-sm-6">
          <button
            type="button"
            name="tarik"
            class="btn btn-danger w-100"
            data-bs-toggle="modal"
            data-bs-target="#tarikModal"
            @click="setTransaction(2)"
          >
            <div class="py-3 text-white">
              <div class="card-body text-start">
                <h5 class="fw-bold fs-1">TARIK</h5>
                <p class="card-text">Jangan Boros!!</p>
              </div>
            </div>
          </button>
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
                  type="text"
                  class="form-control"
                  v-model="nabung.nominal"
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
                </select>
                <!-- <textarea
                    type="text"
                    class="form-control"
                    v-model="event.keterangan"
                  /> -->
              </div>
              <div class="mb-3 text-end">
                <button class="btn btn-dark">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayoutVue>
</template>

<script>
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

    const router = useRouter();
    let saldo = ref([]);

    function setTransaction(obj) {
      nabung.transaction_id = obj;
      // console.log(nabung.transaction_id);
    }

    function store() {
      console.log(nabung);
      axios
        .post("/banks", nabung)
        .then(() => {
          // console.log(nabung);
          alert("Transaction Successful");
          // router.push({
          //   name: "nabung.history",
          // });
        })
        .catch(() => {
          // console.log();
        });
    }
    onMounted(() => {
      axios
        .get("/getsaldo")
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
      nabung,
      router,
      saldo,
      store,
      setTransaction,
    };
  },
};
</script>

<style>
</style>