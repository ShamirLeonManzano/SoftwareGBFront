<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-btn
          color="#04253a"
          dark
          to="/informe3"
          style="margin-top: 22px; margin-left: 75px"
        >
          Informes
        </v-btn>
      </v-col>

      <v-col cols="8">
        <v-list-item three-line>
          <v-list-item-content class="title">
            <v-list-item-title class="text-h5 mb-1"
              >Sub Redes</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col>
        <v-btn
          color="#04253a"
          dark
          @click="dialog = true"
          style="margin-top: 22px; margin-left: 75px"
        >
          Nuevo
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="(subred, index) in subredes"
        :key="index"
        cols="4"
        md="6"
        lg="4"
      >
        <v-card class="mx-auto" max-width="344" elevation="24">
          <v-img :src="subred.foto" height="200px">
            <v-btn
              icon
              style="margin-top: 163px; margin-left: 3px"
              color="white"
              dark
              @click="openDialogPhoto(subred)"
            >
              <v-icon> photo_camera </v-icon>
            </v-btn>
            <v-btn
              icon
              style="margin-top: 163px; margin-left: 268px"
              color="white"
              dark
              @click="enviarId(subred)"
            >
              <v-icon> arrow_right </v-icon>
            </v-btn>
          </v-img>

          <v-card-title>{{ subred.titulo }}</v-card-title>

          <v-card-subtitle>
            Felipe Red: {{ subred.felipeR.nombre }} <br>
            Código: {{subred.codigo}}
          </v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon small class="mr-2" @click="editar(subred)"
                >mdi-pencil</v-icon
              >
            </v-btn>
          </v-card-actions>


        </v-card>
      </v-col>
    </v-row>

    <!-- Nueva Sub Red -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5"> Sub Red</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Código*"
                    required
                    v-model="editedItem.codigo"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Titulo*"
                    required
                    v-model="editedItem.titulo"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Felipe de Red*"
                    hint="Seleccione el Felipe de Red"
                    :items="usuarios"
                    v-model="editedItem.felipeR"
                  ></v-select>
                </v-col>

                <!-- <v-col cols="6">
                  <v-text-field
                    label="Telefono*"
                    required
                    v-model="editedItem.Telefono"
                  ></v-text-field> -->
                <!-- </v-col> -->
              </v-row>
            </v-container>
            <small>* Indica campos requeridos</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="limpiarCajas()">
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="guardar()">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-dialog v-model="dialogPhoto" max-width="500px">
      <v-card>
        <v-card-title> Seleccionar archivo: </v-card-title>
        <v-col>
          <form enctype="multipart/form-data">
            <v-file-input
              truncate-length="15"
              @change="onFileSelect"
            ></v-file-input>
          </form>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="actualizarFoto()"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template>
      <v-snackbar v-model="snackbar">
        {{ msg }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </template>

    <!-- </v-card> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialogPhoto: false,
    idR: "",
    idSubRed: "",
    snackbar: false,
    msg: "",
    bd: 0,
    dialog: false,
    show: false,
    usuarios: [],
    redes: [],
    subredes: [],

    editedItem: {
      titulo: "",
      felipeR: "",
      codigo: "",
      red: "",
    },
  }),
  created() {
    this.listarSubRedes();
    this.listarRedes();
    this.listarUsuarios();
    this.llegarIdR();
    this.checkToken();
    // console.log(this.$store.state.token);
  },

  methods: {
    checkToken() {
      var token = this.$store.state.token;
      if (!token) {
        this.$router.push("/");
      }
    },
    openDialogPhoto(subred) {
      (this.dialogPhoto = true), (this.idSubRed = subred._id);
      console.log(this.idSubRed);
    },

    llegarIdR() {
      console.log(this.$store.state.idR);
      (this.idR = this.$store.state.idR), console.log(this.idR);
    },

    enviarId(subred) {
      this.id = subred._id;
      console.log(this.id);
      this.$store.dispatch("setIdSr", this.id);
      this.$store.dispatch("setIdInf", this.id);
      this.$router.push("/listGrupos");
      console.log(this.$store.state.idSr);
    },

    listarSubRedes() {
      let id = this.$store.state.idR;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`subRed/red/${id}`, header)
        .then((response) => {
          console.log(response.data.subRed);
          this.subredes = response.data.subRed;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    listarUsuarios() {
      let me = this;
      let usuariosA = [];
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("Usuario?value=FR", header)
        .then((response) => {
          console.log(response.data.usuarios);
          usuariosA = response.data.usuarios;
          usuariosA.map(function (x) {
            me.usuarios.push({ text: x.nombre, value: x._id });
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    listarRedes() {
      let me = this;
      let redesA = [];

      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`red`, header)
        .then((response) => {
          console.log(response.data.red);
          redesA = response.data.red;
          redesA.map(function (x) {
            me.redes.push({ text: x.codigo, value: x._id });
            console.log(me.redes);
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    editar(subred) {
      console.log(subred);
      this.bd = 1;
      this.id = subred._id;
      this.editedItem.titulo = subred.titulo;
      this.editedItem.felipeR = subred.felipeR;
      this.editedItem.codigo = subred.codigo;
      this.editedItem.red = subred.red;
      this.dialog = true;
    },

    guardar() {
      if (this.bd == 0) {
        console.log("guardando" + this.bd);
        let header = { headers: { token: this.$store.state.token } };
        let errorA = [];
        const me = this;
        axios
          .post(
            "subRed",
            {
              titulo: this.editedItem.titulo,
              codigo: this.editedItem.codigo,
              red: this.$store.state.idR,
              felipeR: this.editedItem.felipeR,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.snackbar = true;
            me.msg = "Sub Red gaurdada con éxito";
            me.listarSubRedes();
            me.limpiarCajas();
          })
          .catch((error) => {
            console.log(error.response);
            errorA = error.response.data.errors;
            console.log(errorA);
            errorA.map(function (x) {
              me.msg = x.msg;
            });
            me.snackbar = true;
          });
      } else {
        console.log("actualizando " + this.bd);
        let header = { headers: { token: this.$store.state.token } };
        let errorA = [];
        const me = this;
        axios
          .put(
            `subRed/${this.id}`,
            {
              titulo: this.editedItem.titulo,
              codigo: this.editedItem.codigo,
              red: this.editedItem.red,
              felipeR: this.$store.state.idR,
            },
            header
          )
          .then(function () {
            me.snackbar = true;
            me.msg = "Sub Red actualizada con éxito";
            me.listarSubRedes();
            me.limpiarCajas();
          })
          .catch(function (error) {
            console.log(error);
            errorA = error.response.data.errors;
            console.log(errorA);
            errorA.map(function (x) {
              me.msg = x.msg;
            });
            me.snackbar = true;
          });
      }
    },

    limpiarCajas() {
      this.dialog = false, 
      this.editedItem.titulo = "";
      this.editedItem.felipeR = "";
      this.editedItem.codigo = "";

    },

    onFileSelect(files) {
      console.log(files);
      this.selectedFile = files;
      console.log(this.selectedFile);
      console.log("ruta compeltra");
      // console.log(files[0].FullPath);
    },

    async actualizarFoto() {
      const formData = new FormData(); //objeto de datos de formulario
      formData.append("archivo", this.selectedFile); //el objeto tiene varios atributos el nombre
      let header = { headers: { token: this.$store.state.token } };
      await axios
        .post(`subRed/uploadCloud/${this.idSubRed}`, formData, header)
        .then((response) => {
          console.log(response);
          // this.traerFoto(this.idPersona)
          this.snackbar = true;
          this.msg = "Imagen subida con éxito";
          this.dialogPhoto = false;
          this.listarSubRedes();
        })
        .catch((error) => {
          console.log(error.response);
          if (!error.response.data.msg) {
            console.log(error.response);
          } else {
            console.log(error.response.data.msg);
          }
        });
    },
  },
};
</script>

<style>
.title {
  margin-left: 500px;
}

.cardsGrupos {
  padding: 15px;
  width: 1250px;
  margin: auto;
  margin-bottom: 20px;
}
</style>