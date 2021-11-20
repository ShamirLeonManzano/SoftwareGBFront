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
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1 text-center"
              >Grupos Bíblicos</v-list-item-title
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

    <div>
      <v-row justify="center">
        <v-col
          v-for="(grupo, index) in grupos"
          :key="index"
          cols="4"
          md="6"
          lg="4"
        >
          <v-card
            class="mx-auto elevation-5"
            max-width="344"
            style="margin-bottom: 20px"
          >
            <v-img :src="grupo.foto" height="200px">
              <v-btn
                icon
                style="margin-top: 163px; margin-left: 3px"
                color="white"
                dark
                @click="openDialogPhoto(grupo)"
              >
                <v-icon> photo_camera </v-icon>
              </v-btn>

              <v-btn
                icon
                style="margin-top: 163px; margin-left: 268px"
                color="white"
                dark
                @click="enviarId(grupo)"
              >
                <v-icon> arrow_right </v-icon>
              </v-btn>
            </v-img>

            <v-card-title>{{ grupo.titulo }}</v-card-title>

            <v-card-subtitle>
              Felipe Grupo: <span>{{ grupo.felipeG.nombre }}</span
              ><br />
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
                @click="show = !show"
                style="margin-left: 5px"
              >
                Información</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn icon right>
                <v-icon small class="mr-2" @click="editar(grupo)"
                  >mdi-pencil</v-icon
                >
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  <span>Código: {{ grupo.codigo }} </span><br />
                  <span>Telefono: {{ grupo.telefono }}</span
                  ><br />
                  <span>Dirección: {{ grupo.direccion }} </span>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Grupo Bíblico</span>
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
                    label="Felipe de Grupo*"
                    hint="Seleccione el Felipe de Grupo"
                    :items="usuarios"
                    v-model="editedItem.felipeG"
                  ></v-select>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.telefono"
                    label="Telefono*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="editedItem.direccion"
                    label="Dirección*"
                    required
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
    idGrupo: "",
    dialogPhoto: false,
    idSr: "",
    snackbar: false,
    msg: "",
    dialog: false,
    show: "",
    id: "",
    bd: 0,
    redes: [],
    subRedes: [],
    usuarios: [],
    grupos: [],
    editedItem: {
      titulo: "",
      codigo: "",
      direccion: "",
      felipeG: "",
      telefono: "",
      red: "",
      subRed: "",
    },
  }),
  created() {
    this.listarGrupos();
    this.listarUsuarios();
    this.listarRedes();
    this.listarSubRedes();
    this.llegarIdSR();
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
    download({ foto }) {
      console.log(foto);
      // this.url = post.archivo
      // console.log(this.url);
      // let header = {headers: {"token": this.$store.state.token}};
      // console.log(this.$store.state.token);
      axios({ url: foto, method: "GET", responseType: "blob" })
        .then((response) => {
          console.log(response);
          var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "image.png");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    openDialogPhoto(grupo) {
      (this.dialogPhoto = true), (this.idGrupo = grupo._id);
      console.log(this.idGrupo);
    },

    llegarIdSR() {
      console.log(this.$store.state.idSr);
      (this.idSr = this.$store.state.idSr), console.log(this.idSr);
    },

    enviarId(grupo) {
      this.id = grupo._id;
      console.log(this.id);
      this.$store.dispatch("setIdGb", this.id);
      this.$store.dispatch("setIdInf", this.id);
      this.$router.push("/informe2");
      console.log(this.$store.state.idGb);
    },

    listarGrupos() {
      let id = this.$store.state.idSr;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`grupoBiblico/subRedId/${id}`, header)
        .then((response) => {
          console.log(response.data.grupoBiblico);
          this.grupos = response.data.grupoBiblico;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    editar(grupo) {
      console.log(grupo);
      this.bd = 1;
      this.id = grupo._id;
      this.editedItem.titulo = grupo.titulo;
      this.editedItem.felipeG = grupo.felipeG;
      this.editedItem.codigo = grupo.codigo;
      this.editedItem.telefono = grupo.telefono;
      this.editedItem.direccion = grupo.direccion;
      this.editedItem.red = grupo.red;
      this.editedItem.subRed = grupo.subRed;
      this.dialog = true;
      console.log(this.id);
    },

    listarUsuarios() {
      let me = this;
      let usuariosA = [];
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("Usuario?value=FG", header)
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

    listarSubRedes() {
      let me = this;
      let subRedesA = [];
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("subRed", header)
        .then((response) => {
          console.log(response.data.subRed);
          subRedesA = response.data.subRed;
          subRedesA.map(function (x) {
            me.subRedes.push({ text: x.codigo, value: x._id });
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
            "grupoBiblico",
            {
              titulo: this.editedItem.titulo,
              felipeG: this.editedItem.felipeG,
              codigo: this.editedItem.codigo,
              telefono: this.editedItem.telefono,
              direccion: this.editedItem.direccion,
              subRed: this.$store.state.idSr,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.snackbar = true;
            me.msg = "Grupo Bíblico guardado con éxito";
            me.listarGrupos();
            this.limpiarCajas();
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
        const me = this;
        axios
          .put(
            `grupoBiblico/${this.id}`,
            {
              titulo: this.editedItem.titulo,
              felipeG: this.editedItem.felipeG,
              codigo: this.editedItem.codigo,
              telefono: this.editedItem.telefono,
              direccion: this.editedItem.direccion,
              subRed: this.$store.state.idSr,
            },
            header
          )
          .then(function () {
            me.snackbar = true;
            me.msg = "Grupo Bíblico actualizado con éxito";
            me.listarGrupos();
            me.limpiarCajas();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    limpiarCajas() {
      this.bd = 0;
      this.dialog = false;
      (this.editedItem.titulo = ""),
        (this.editedItem.felipeG = ""),
        (this.editedItem.codigo = ""),
        (this.editedItem.telefono = ""),
        (this.editedItem.direccion = "");
      (this.editedItem.red = ""), (this.editedItem.subRed = "");
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
        .post(`grupoBiblico/uploadCloud/${this.idGrupo}`, formData, header)
        .then((response) => {
          console.log(response);
          // this.traerFoto(this.idPersona)
          this.snackbar = true;
          this.msg = "Imagen subida con éxito";
          this.dialogPhoto = false;
          this.listarGrupos();
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
.cardsGrupos {
  padding: 15px;
  width: 1250px;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
}
.card {
  padding: 50px;
  color: blue;
}
</style>