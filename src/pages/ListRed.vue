<template>
  <div>
    <v-row>
      <v-col cols="10">
        <v-list-item three-line>
          <v-list-item-content class="title">
            <v-list-item-title class="text-h5 mb-1" id="title"
              >Redes</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col cols="2">
        <v-btn
          style="margin-top: 27px; margin-left: 75px"
          color="#04253a"
          dark
          @click="dialog = true"
        >
          Nuevo
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="flex" justify="center">
      <v-col v-for="(red, index) in redes" :key="index" cols="4" md="6" lg="4">
        <v-card class="mx-auto" max-width="344" elevation="24">
          <v-img :src="red.foto" height="200px">
            <v-btn
              icon
              style="margin-top: 163px; margin-left: 3px"
              color="white"
              dark
              @click="openDialogPhoto(red)"
            >
              <v-icon> photo_camera </v-icon>
            </v-btn>

            <v-btn
              icon
              style="margin-top: 163px; margin-left: 268px"
              color="white"
              dark
              @click="enviarId(red)"
            >
              <v-icon> arrow_right </v-icon>
            </v-btn>
          </v-img>
          <v-card-title>{{ red.titulo }}</v-card-title>

          <v-card-subtitle>
            Felipe Supervisor: {{ red.felipeS.nombre }} <br>
            Código: {{red.codigo}}
          </v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon small class="mr-2" @click="editar(red)"
                >mdi-pencil</v-icon
              >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ editedItem.titulo }}</span>
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
                <v-col cols="6">
                  <v-select
                    label="Felipe Supervisor*"
                    hint="Seleccione el Felipe Supervisor"
                    :items="usuarios"
                    v-model="editedItem.felipeS"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="Iglesia*"
                    hint="Seleccione Iglesia"
                    :items="iglesias"
                    v-model="editedItem.iglesia"
                  ></v-select>
                </v-col>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    showMenu: false,
    selectFiled: null,
    dialogPhoto: false,
    idRed: "",
    dialog: false,
    msg: "",
    snackbar: "",
    bd: 0,
    show: false,
    iglesias: [],
    usuarios: [],
    redes: [],
    editedItem: {
      titulo: "",
      codigo: "",
      iglesia: "",
      felipeS: "",
    },
  }),
  created() {
    this.listarRedes();
    this.listarUsuarios();
    this.listarIglesias();
    this.checkToken();
  },

  methods: {
    checkToken() {
      var token = this.$store.state.token;
      if (!token) {
        this.$router.push("/");
      }
    },
    openDialogPhoto(red) {
      (this.dialogPhoto = true), (this.idRed = red._id);
      console.log(this.idRed);
    },

    enviarId(red) {
      this.id = red._id;
      console.log(this.id);
      this.$store.dispatch("setIdR", this.id);
      this.$store.dispatch("setIdInf", this.id);
      this.$router.push("/listSubRed");
      console.log(this.$store.state.idR);
    },
    listarRedes() {
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("red", header)
        .then((response) => {
          console.log(response.data.red);
          this.redes = response.data.red;
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
        .get("Usuario?value=FS", header)
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

    listarIglesias() {
      let me = this;
      let iglesiaA = [];

      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`iglesia`, header)
        .then((response) => {
          console.log(response.data.iglesias);
          iglesiaA = response.data.iglesias;
          iglesiaA.map(function (x) {
            me.iglesias.push({ text: x.codigo, value: x._id });
            console.log(me.iglesias);
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    guardar() {
      if (this.bd == 0) {
        console.log("guardando" + this.bd);
        let header = { headers: { token: this.$store.state.token } };
        let errorA = [];
        const me = this;
        axios
          .post(
            "red",
            {
              titulo: this.editedItem.titulo,
              codigo: this.editedItem.codigo,
              iglesia: this.editedItem.iglesia,
              felipeS: this.editedItem.felipeS,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.snackbar = true;
            me.msg = "Red guardada con éxito";
            me.listarRedes();
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
            `Red/${this.id}`,
            {
              titulo: this.editedItem.titulo,
              codigo: this.editedItem.codigo,
              iglesia: this.editedItem.iglesia,
              felipeS: this.editedItem.felipeS,
            },
            header
          )
          .then(function () {
            me.snackbar = true;
            me.msg = "Red actualizada con éxito";
            me.listarRedes();
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

    editar(red) {
      console.log(red);
      this.bd = 1;
      this.id = red._id;
      this.editedItem.titulo = red.titulo;
      this.editedItem.felipeS = red.felipeS;
      this.editedItem.codigo = red.codigo;
      this.editedItem.iglesia = red.iglesia;
      this.dialog = true;
    },

    limpiarCajas() {
      (this.dialog = false), (this.editedItem.titulo = "");
      this.editedItem.felipeS = "";
      this.editedItem.codigo = "";
      this.editedItem.iglesia = "";
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
        .post(`red/uploadCloud/${this.idRed}`, formData, header)
        .then((response) => {
          console.log(response);
          // this.traerFoto(this.idPersona)
          this.snackbar = true;
          this.msg = "Imagen subida con éxito";
          this.dialogPhoto = false;
          this.listarRedes();
        })
        .catch((error) => {
          console.log(error.response);
          if (!error.response.data.msg) {
            console.log(error.response);
            // this.msgError = error.response.data.errors[0].msg;
            // this.msjcompra(this.msgError);
          } else {
            // this.msgError = error.response.data.msg;
            console.log(error.response.data.msg);
            // this.msgError =error.response.data.msg;
            // this.msjcompra(this.msgError);
          }
        });
    },
  },
};
</script>

<style>
#title {
  font-family: "Times New Roman";
}

.cardsGrupos {
  padding: 15px;
  width: 1250px;
  margin: auto;
  margin-bottom: 20px;
}
</style>