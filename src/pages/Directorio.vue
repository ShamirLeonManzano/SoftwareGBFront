<template>
  <div>
    <v-card class="cardDir">
      <v-data-table :headers="headers" :items="personas" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Directorio</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#04253a"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nueva
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Directorio</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="7">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="editedItem.cumpleaños"
                          label="Cumpleaños"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="7">
                        <v-text-field
                          v-model="editedItem.direccion"
                          label="Dirección"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="editedItem.telefono"
                          label="Telefono"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="7">
                        <v-text-field
                          v-model="editedItem.email"
                          label="E-mail"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="limpiarCajas()">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="guardar()">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Estas seguro de eliminar esta persona?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleted(deletedId)"
                  >Eliminar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:[`item.opciones`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                @click="editar(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small @click="openDeleted(item)" v-bind="attrs" v-on="on">
                delete
              </v-icon>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>

        <!-- <template v-slot:[`item.estado`]="{ item }">
          <span class="blue--text" v-if="item.estado == 1">Activo </span>
          <span class="red--text" v-if="item.estado == 0">Inactivo </span>
        </template> -->
      </v-data-table>
    </v-card>

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
    deletedId: "",
    msg: "",
    snackbar: false,
    bd: 0,
    dialog: false,
    dialogDelete: false,
    search: "",
    grupos: [],
    personas: [],
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Cumpleaños", value: "cumpleaños" },
      { text: "Dirección", value: "direccion" },
      { text: "Telefono", value: "telefono" },
      { text: "E-mail", value: "email" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],

    editedItem: {
      nombre: "",
      cumpleaños: "",
      direccion: "",
      telefono: "",
      email: "",
      gBiblico: "",
    },
  }),
  created() {
    this.listarPersonas();
    this.listarGrupos();
    this.checkToken();
  },
  methods: {
    checkToken(){
      var token = this.$store.state.token
      if (!token) {
          this.$router.push("/");
      }
    },

    listarPersonas() {
      let id = this.$store.state.idGb;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`directorio/grupoBiblico/${id}`, header)
        .then((response) => {
          console.log(response.data.directorio);
          this.personas = response.data.directorio;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    listarGrupos() {
      let me = this;
      let gruposA = [];
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("grupoBiblico", header)
        .then((response) => {
          console.log(response.data.grupoBiblico);
          gruposA = response.data.grupoBiblico;
          gruposA.map(function (x) {
            me.grupos.push({ text: x.codigo, value: x._id });
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
            "directorio",
            {
              nombre: this.editedItem.nombre,
              cumpleaños: this.editedItem.cumpleaños,
              direccion: this.editedItem.direccion,
              telefono: this.editedItem.telefono,
              email: this.editedItem.email,
              gBiblico: this.$store.state.idGb,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.snackbar = true;
            me.msg = "Persona guardada con éxito";
            me.listarPersonas();
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
        const me = this;
        let header = { headers: { token: this.$store.state.token } };
        let errorA = [];
        console.log(header.headers.token);
        axios
          .put(
            `directorio/${this.id}`,
            {
              nombre: this.editedItem.nombre,
              cumpleaños: this.editedItem.cumpleaños,
              direccion: this.editedItem.direccion,
              telefono: this.editedItem.telefono,
              email: this.editedItem.email,
              gBiblico: this.editedItem.gBiblico,
            },
            header
          )
          .then(function () {
            me.snackbar = true;
            me.msg = "Persona actualizada con éxito";
            me.listarPersonas();
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
    editar(item) {
      console.log(item);
      this.bd = 1;
      this.id = item._id;
      this.editedItem.nombre = item.nombre;
      this.editedItem.cumpleaños = item.cumpleaños;
      this.editedItem.direccion = item.direccion;
      this.editedItem.telefono = item.telefono;
      this.editedItem.email = item.email;
      this.editedItem.gBiblico = item.gBiblico;
      this.dialog = true;
      console.log(this.id);
    },

    openDeleted(item) {
      this.dialogDelete = true;
      this.deletedId = item._id;
      console.log(this.deletedId);
    },

    deleted(id) {
      this.id = id;
      let header = { headers: { token: this.$store.state.token } };
      let errorA = [];
      const me = this;
      axios
        .delete(`directorio/delete/${this.id}`, header)
        .then(function () {
          me.snackbar = true;
          me.msg = "Persona eliminada con éxito";
          me.listarPersonas();
          me.dialogDelete = false;
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
    },

    limpiarCajas() {
      this.bd=0,
      this.dialog = false, 
      this.editedItem.nombre = "";
      this.editedItem.cumpleaños = "";
      this.editedItem.direccion = "";
      this.editedItem.telefono = "";
      this.editedItem.email = "";
    },
  },
};
</script>

<style>
.cardDir {
  padding: 15px;
  margin: auto;
  margin-top: 20px;
  width: 1280px;
}
</style>