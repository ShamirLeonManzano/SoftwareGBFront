<template>
  <div>
    <v-row>
      <v-col cols="10">
        <v-list-item three-line>
          <v-list-item-content class="title">
            <v-list-item-title class="text-h5 mb-1" id="title"
              >Iglesia</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col cols="2">
        <v-btn
          style="margin-top: 27px; margin-left: 40px"
          color="#04253a"
          dark
          @click="dialog = true"
        >
          Nuevo
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="flex" justify="center">
      <v-col
        v-for="(iglesia, index) in iglesias"
        :key="index"
        cols="4"
        md="6"
        lg="4"
      >
        <v-card class="mx-auto" max-width="344" elevation="24">
          <v-img :src="iglesia.foto" height="200px">
            <v-btn
              icon
              style="margin-top: 163px; margin-left: 3px"
              color="white"
              dark
              @click="openDialogPhoto(iglesia)"
            >
              <v-icon> photo_camera </v-icon>
            </v-btn>

            <v-btn
              icon
              style="margin-top: 163px; margin-left: 268px"
              color="white"
              dark
              @click="enviarId(iglesia)"
            >
              <v-icon> arrow_right </v-icon>
            </v-btn>
          </v-img>
          <v-card-title>{{ iglesia.titulo }}</v-card-title>

          <v-card-subtitle> Pastor Example</v-card-subtitle>
            <v-card-text>
              Código: {{iglesia.codigo}}
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon small class="mr-2" @click="editar(iglesia)"
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
    idIglesia: "",
    dialog: false,
    msg: "",
    snackbar: "",
    bd: 0,
    show: false,
    iglesias: [],
    usuarios: [],
    editedItem: {
      titulo: "",
      codigo: "",
    },
  }),
  created() {
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
    openDialogPhoto(iglesia) {
      this.dialogPhoto = true, 
      this.idIglesia = iglesia._id;
      console.log(this.idIglesia);
    },

    enviarId(iglesia) {
      this.id = iglesia._id;
      console.log(this.id);
      this.$store.dispatch("setIdInf", this.id);
      this.$router.push("/informe3");
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
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`iglesia`, header)
        .then((response) => {
          console.log(response.data.iglesias);
          this.iglesias = response.data.iglesias;
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
            "iglesia",
            {
              titulo: this.editedItem.titulo,
              codigo: this.editedItem.codigo,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.snackbar = true;
            me.msg = "Iglesia guardada con éxito";
            me.listarIglesias();
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
            `iglesia/${this.id}`,
            {
              titulo: this.editedItem.titulo,
              codigo: this.editedItem.codigo,
            },
            header
          )
          .then(function () {
            me.snackbar = true;
            me.msg = "Iglesia actualizada con éxito";
            me.listarIglesias();
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

    editar(iglesia) {
      console.log(iglesia);
      this.bd = 1;
      this.id = iglesia._id;
      this.editedItem.titulo = iglesia.titulo;
      this.editedItem.codigo = iglesia.codigo;
      this.dialog = true;
    },

    limpiarCajas() {
      this.bd=0;
      this.dialog = false;
      this.editedItem.titulo = "";
      this.editedItem.codigo = "";
      this.selectFiled = "";

    },

    onFileSelect(files) {
      console.log(files);
      this.selectedFile = files;
      console.log(this.selectedFile);
      console.log("ruta completa");
      // console.log(files[0].FullPath);
    },

    async actualizarFoto() {
      const formData = new FormData(); //objeto de datos de formulario
      formData.append("archivo", this.selectedFile); //el objeto tiene varios atributos el nombre
      let header = { headers: { token: this.$store.state.token } };
      await axios
        .post(`iglesia/uploadCloud/${this.idIglesia}`, formData, header)
        .then((response) => {
          console.log(response);
          this.snackbar = true;
          this.msg = "Imagen subida con éxito";
          this.dialogPhoto = false;
          this.listarIglesias();
          this.limpiarCajas();
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