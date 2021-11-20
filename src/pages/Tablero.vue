<template>
  <div>
    <v-row justify="center" style="margin: auto">
      <v-col cols="10">
        <h1 class="TitleH1" style="margin-left: 500px">Actividades</h1>
      </v-col>

      <v-col>
        <v-btn
          color="#04253a"
          dark
          @click="dialog = true"
          v-if="
            this.$store.state.rol == 'ADMIN_ROL' ||
            this.$store.state.rol == 'PS'
          "
        >
          Nuevo
        </v-btn>
      </v-col>
    </v-row>
    <div class="contaPost">
      <v-dialog v-model="dialog" min-width="1000px" class="dialogPost">
        <!-- Pagina Postear -->

        <v-card style="margin-left: 10px">
          <v-toolbar flat color="blue-grey" dark>
            <v-toolbar-title>Submit a post</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              class="labelTitle"
              filled
              label="Titulo"
              style="margin-top: 13px"
              v-model="editedItem.titulo"
              :disabled="disable"
            ></v-text-field>

            <v-textarea
              filled
              label="Descripción"
              v-model="editedItem.descripcion"
              :disabled="disable"
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <!-- <v-col cols="6"> 
                        <v-file-input truncate-length="15" @change="onFileSelect" ></v-file-input>
                        </v-col> -->
            <v-col cols="2">
              <v-btn
                color="warning"
                depressed
                style="margin-left: 200px"
                @click="limpiarCajas()"
                >Cancelar</v-btn
              >
            </v-col>
            <v-col cols="2">
              <v-btn
                color="success"
                depressed
                style="margin-left: 200px"
                @click="guardar()"
                v-if="
                  this.$store.state.rol == 'ADMIN_ROL' ||
                  this.$store.state.rol == 'PS'
                "
                >Post</v-btn
              >
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row>
        <v-col>
          <!-- tarjetas post -->
          <template>
            <div v-for="(post, index) in posts" :key="index">
              <v-card class="mx-auto cardPost" color="blue-grey lighten-4" dark>
                <v-card-title>
                  <!-- <v-icon large left > mdi-twitter </v-icon> -->
                  <h1 class="text-h5 font-weight-bold" style="color: #212121">
                    {{ post.titulo }}
                  </h1>
                </v-card-title>

                <v-card-text
                  class="text-h6 font-weight-light"
                  style="color: #212121"
                >
                  {{ post.descripcion }}
                </v-card-text>
                <v-card-text
                  class="text-h8 font-weight-light"
                  style="color: #212121"
                >
                  <v-icon color="black"> insert_drive_file </v-icon>
                  <a href="">
                    {{ post.archivo }}
                  </a>
                </v-card-text>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-icon style="margin-right: 10px" color="black">
                      calendar_today
                    </v-icon>

                    <v-list-item-content>
                      <v-list-item-title style="color: #212121">{{
                        post.createAt.split("T")[0]
                      }}</v-list-item-title>

                      <!-- <a :href="post.archivo"  @click.prevent="download(post)">{{post.archivo}} </a> -->
                    </v-list-item-content>

                    <!-- <span>{{post.archivo}}</span> -->
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon dark color="#04253a">
                          <v-icon @click="editar(post)" v-bind="attrs" v-on="on"
                            >edit</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Editar</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon dark color="#04253a">
                          <v-icon @click="detail(post)" v-bind="attrs" v-on="on"
                            >info</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Información</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          color="#04253a"
                          dark
                          @click="openDialogPhoto(post)"
                        >
                          <v-icon v-bind="attrs" v-on="on">
                            picture_as_pdf
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Agregar PDF</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          color="#04253a"
                          dark
                          @click="download(post)"
                        >
                          <v-icon v-bind="attrs" v-on="on">
                            file_download
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Descargar PDF</span>
                    </v-tooltip>
                  </v-list-item>
                </v-card-actions>
              </v-card>
              <v-sheet
                color="rgba(118, 118, 118, 0.15)"
                height="4"
                width="1100"
              ></v-sheet>
            </div>
            <v-divider></v-divider>
          </template>
        </v-col>
      </v-row>
    </div>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    url: "",
    dialogPhoto: false,
    snackbar: false,
    msg: "",
    disable: false,
    show: false,
    dialog: false,
    bd: 0,
    posts: [],
    fileSelect: null,
    idPost: "",
    editedItem: {
      titulo: "",
      descripcion: "",
      user: "",
    },
  }),

  created() {
    this.listarPost();
    this.checkToken();
    // this.fecha();
  },

  methods: {
    checkToken() {
      var token = this.$store.state.token;
      if (!token) {
        this.$router.push("/");
      }
    },
    listarPost() {
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("publicacion", header)
        .then((response) => {
          console.log(response.data.publicacion);
          this.posts = response.data.publicacion;
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
            "publicacion",
            {
              titulo: this.editedItem.titulo,
              descripcion: this.editedItem.descripcion,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.listarPost();
            this.limpiarCajas();
            me.snackbar = true;
            me.msg = "Publicación guardada con éxito";
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
        console.log("actualizando" + this.bd);
        const me = this;
        let header = { headers: { token: this.$store.state.token } };
        let errorA = [];
        axios
          .put(
            `publicacion/${this.id}`,
            {
              titulo: this.editedItem.titulo,
              descripcion: this.editedItem.descripcion,
            },
            header
          )
          .then(function () {
            me.listarPost();
            me.limpiarCajas();
            me.snackbar = true;
            me.msg = "Publicación actualizada con éxito";
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

    editar(post) {
      this.bd = 1;
      this.id = post._id;
      this.editedItem.titulo = post.titulo;
      this.editedItem.descripcion = post.descripcion;
      this.dialog = true;
      this.disable = false;
    },

    detail(post) {
      console.log(post);
      //   this.bd = 1;
      //   this.id = item._id;
      this.editedItem.titulo = post.titulo;
      this.editedItem.descripcion = post.descripcion;
      this.dialog = true;
      this.disable = true;
    },

    limpiarCajas() {
      this.bd = 0;
      this.dialog = false;
      this.editedItem.titulo = "";
      this.editedItem.descripcion = "";
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
        .post(`publicacion/uploadCloud/${this.idPost}`, formData, header)
        .then((response) => {
          console.log(response);
          // this.traerFoto(this.idPersona)
          this.snackbar = true;
          this.msg = "Archivo subida con éxito";
          this.dialogPhoto = false;
          this.listarPost();
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

    openDialogPhoto(post) {
      (this.dialogPhoto = true), (this.idPost = post._id);
      console.log(this.idPost);
    },

    download({ archivo }) {
      console.log(archivo);
      // this.url = post.archivo
      // console.log(this.url);
      // let header = {headers: {"token": this.$store.state.token}};
      // console.log(this.$store.state.token);
      axios({ url: archivo, method: "GET", responseType: "blob" })
        .then((response) => {
          console.log(response);
          var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "file.png");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style>
.TitleH1 {
  margin-top: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.cardPost {
  margin-bottom: 20px;
  margin-top: 20px;
  max-width: 1280px;
}

.contaPost {
  min-width: 180px;
  padding: 100px;
}
.dialogPost {
  box-shadow: 0px;
  overflow-y: visible;
}
</style>