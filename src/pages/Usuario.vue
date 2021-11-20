<template>
  <div>
    <v-card class="card">
      <v-data-table
        :headers="headers"
        :items="usuarios"
        :search="search"
        sort-by="codigo"
        class="table"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Usuario</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              id="brSea"
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar por Nombre o Código"
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
                  <span class="text-h5">Usuario</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          v-model="editedItem.codigo"
                          label="Codigo"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="9">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="3" s>
                        <v-text-field
                          v-model="editedItem.red"
                          label="Red"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-select
                          v-model="editedItem.rol"
                          :items="roles"
                          label="Rol"
                        ></v-select>
                      </v-col>

                      <v-col cols="5">
                        <v-text-field
                          v-model="editedItem.telefono"
                          label="Telefono"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="E-mail"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Contraseña"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="limpiarCajas()"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="guardar()"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
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
              <template v-if="item.estado">
                <v-icon
                  small
                  @click="activarDesactivarMostrar(2, item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-block-helper
                </v-icon>
              </template>

              <template v-else>
                <v-icon
                  small
                  @click="activarDesactivarMostrar(1, item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-check
                </v-icon>
              </template>
            </template>
            <span>Activar/Desactivar</span>
          </v-tooltip>
        </template>

        <template v-slot:[`item.estado`]="{ item }">
          <span class="blue--text" v-if="item.estado == 1">Activo </span>
          <span class="red--text" v-if="item.estado == 0">Inactivo </span>
        </template>
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
    snackbar: false,
    msg: "",
    search: "",
    dialog: false,
    usuarios: [],
    roles: ["ADMIN_ROL", "PS", "FS", "FR", "FG"],

    headers: [
      { text: "Código", value: "codigo" },
      { text: "Nombre", value: "nombre" },
      { text: "Email", value: "email" },
      { text: "Red", value: "red" },
      { text: "Rol", value: "rol" },
      { text: "Telefono", value: "telefono" },
      { text: "Estado", value: "estado" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      codigo: "",
      email: "",
      telefono: "",
      rol: "",
    },
    bd: 0,
  }),

  created() {
    this.listarUsuarios();
    this.checkToken();
  },

  methods: {
    checkToken() {
      var token = this.$store.state.token;
      if (!token) {
        this.$router.push("/");
      }
    },
    listarUsuarios() {
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("Usuario", header)
        .then((response) => {
          console.log(response.data.usuarios);
          this.usuarios = response.data.usuarios;
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
            "usuario",
            {
              codigo: this.editedItem.codigo,
              nombre: this.editedItem.nombre,
              rol: this.editedItem.rol,
              telefono: this.editedItem.telefono,
              email: this.editedItem.email,
              password: this.editedItem.password,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.snackbar = true;
            me.msg = "Usuario guardado con éxito";
            me.listarUsuarios();
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
        axios
          .put(
            `usuario/${this.id}`,
            {
              codigo: this.editedItem.codigo,
              nombre: this.editedItem.nombre,
              rol: this.editedItem.rol,
              telefono: this.editedItem.telefono,
              email: this.editedItem.email,
              password: this.editedItem.password,
            },
            header
          )
          .then(function () {
            me.snackbar = true;
            me.msg = "Usuario actualizado con éxito";
            me.listarUsuarios();
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

    activarDesactivarMostrar(accion, item) {
      let id = item._id;
      console.log(accion);
      if (accion == 2) {
        console.log(id);
        let me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios
          .put(
            `usuario/desactivar/${id}`,
            {
              estado: 0,
            },
            header
          )
          .then(function () {
            me.listarUsuarios();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (accion == 1) {
        console.log(id);
        let me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios
          .put(
            `usuario/activar/${id}`,
            {
              estado: 1,
            },
            header
          )
          .then(function () {
            me.listarUsuarios();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    editar(item) {
      this.bd = 1;
      this.id = item._id;
      this.editedItem.nombre = item.nombre;
      this.editedItem.codigo = item.codigo;
      this.editedItem.email = item.email;
      this.editedItem.telefono = item.telefono;
      this.editedItem.rol = item.rol;
      this.editedItem.password = item.password;
      this.dialog = true;
      console.log(this.id);
    },

    limpiarCajas() {
      (this.dialog = false), (this.editedItem.nombre = "");
      this.editedItem.codigo = "";
      this.editedItem.email = "";
      this.editedItem.telefono = "";
      this.editedItem.rol = "";
      this.editedItem.password = "";
    },
  },
};
</script>

<style>
.card {
  padding: 15px;
  margin: auto;
  margin-top: 20px;
  width: 1280px;
}

.table {
  padding: 10px;
}
</style>      