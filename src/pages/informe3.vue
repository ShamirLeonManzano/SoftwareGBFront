<template>
  <div>
    <v-card class="card" v-if="muestra == 0">
      <v-data-table
        :headers="headers"
        :items="informes"
        :search="search"
        sort-by="codigo"
        class="table"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Informes </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              id="brSea"
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar por Fecha"
              single-line
              hide-details
            ></v-text-field>
            <!-- <v-spacer></v-spacer> -->
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="warning"
                  icon
                  to="/grafica"
                  v-bind="attrs"
                  v-on="on"
                  style="margin-left: 20px"
                >
                  <v-icon>bar_chart</v-icon></v-btn
                >
              </template>
              <span>Gráfica</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn color="#04253a" dark class="mb-2" @click="cambiarPagina(2)">
              Nuevo
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.opciones`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                @click="cambiarPagina(1, item)"
                v-bind="attrs"
                v-on="on"
              >
                description
              </v-icon>
            </template>
            <span>Detalle</span>
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

    <div v-if="muestra == 1">
      <v-container>
        <v-btn @click="cambiarPagina(0, false)" dark color="#04253a"
          >Volver</v-btn
        >
        <v-spacer></v-spacer>
      </v-container>

      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-card
              class="pa-1"
              outlined
              style="font-weight: bold; text-align: center"
              >DETALLE DE INFORME</v-card
            >
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Fecha: </strong>{{ this.detalle.fecha.split("T")[0]
              }}<br />
            </v-card>
          </v-col>

          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Estado: </strong>
              <span class="blue--text" v-if="detalle.estado == 1">Activo </span>
              <span class="red--text" v-if="detalle.estado == 0"
                >Inactivo
              </span>
              <br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Código: </strong>{{ this.detalle.codigo }}<br />
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Usuario: </strong>{{ this.datosUsuario.nombre }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Total Personas: </strong>{{ this.detalle.total }}<br />
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card
              class="pa-1"
              outlined
              style="font-weight: bold; text-align: center"
              >ASISTENCIA</v-card
            >
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Felipe Grupo: {{ detalle.fGrupo }} </strong>

              <br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Felipe Ayudante: {{ detalle.fAyudante }} </strong>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Felipe Maestro: {{ detalle.fMaestro }}</strong>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Felipe Anfitrión: {{ detalle.fAnfitrion }} </strong>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Felipes: </strong>{{ this.detalle.felipes }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Discipulos: </strong>{{ this.detalle.discipulos }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Amigos: </strong>{{ this.detalle.amigosA }}<br />
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Niños: </strong>{{ this.detalle.niñosA }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Reconciliados: </strong>{{ this.detalle.reconciliados
              }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Nuevos: </strong>{{ this.detalle.nuevos }}<br />
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Total Asistencia: </strong>{{ this.detalle.totalAm
              }}<br />
            </v-card>
          </v-col>
        </v-row>

        <!-- DETALLE CONVERSIONES -->

        <v-row>
          <v-col>
            <v-card
              class="pa-1"
              outlined
              style="font-weight: bold; text-align: center"
              >CONVERSIONES</v-card
            >
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Adultos: </strong>{{ this.detalle.adultos }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Niños: </strong>{{ this.detalle.niñosC }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Total Conversiones: </strong>{{ this.detalle.totalC
              }}<br />
            </v-card>
          </v-col>
        </v-row>

        <!-- DETALLE ASIS DOMINICAL -->

        <v-row>
          <v-col>
            <v-card
              class="pa-1"
              outlined
              style="font-weight: bold; text-align: center"
              >ASISTENCIA DOMINICAL</v-card
            >
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Hermanos: </strong>{{ this.detalle.hermanos }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Amigos: </strong>{{ this.detalle.amigosAD }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Total Niños: </strong>{{ this.detalle.niñosAD }}<br />
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Total Asistencia Dominical: </strong
              >{{ this.detalle.totalAD }}<br />
            </v-card>
          </v-col>
        </v-row>

        <!-- DETALLE FINANZAS -->

        <v-row>
          <v-col>
            <v-card
              class="pa-1"
              outlined
              style="font-weight: bold; text-align: center"
              >FINANZAS</v-card
            >
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Diezmos: </strong>{{ this.detalle.diezmo }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Ofrendas: </strong>{{ this.detalle.ofrenda }}<br />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Total Finanzas: </strong>{{ this.detalle.totalF }}<br />
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-card class="pa-1" outlined>
              <strong>Otros: </strong>{{ this.detalle.otros }}<br />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- FORMULARIO -->
    <div v-if="muestra == 2">
      <v-container>
        <v-row>
          <v-col>
            <v-btn @click="cambiarPagina(0, false)" dark color="#04253a"
              >Volver</v-btn
            >
          </v-col>

          <v-col>
            <h2>Formulario de Informe</h2>
          </v-col>

          <v-col>
            <v-btn
              @click="guardar()"
              dark
              color="#04253a"
              style="margin-left: 250px"
              >Guardar</v-btn
            >
          </v-col>
        </v-row>
        <v-spacer></v-spacer>

        <!-- TARJETA ASISTENCIA -->

        <v-card class="cardInf" elevation-1>
          <v-row justify="center">
            <h2>Asistencia</h2>
          </v-row>

          <v-row justify="center">
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.fGrupo"
                label="Felipes Grupo"
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.fAyudante"
                label="Felipes Ayudantes"
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.fMaestro"
                label="Felipes Maestros"
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.fanfitrion"
                label="Felipes Anfitriones"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.felipes"
                label="Felipes"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.discipulos"
                label="Discipulos"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.amigosA"
                label="Amigos"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.niñosA"
                label="Niños"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.reconciliados"
                label="Reconciliados"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.nuevos"
                label="Nuevos"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <div style="margin: 30px 50px 10px 20px">
            <span class="black--text"
              >Total :
              {{
                (editedItem.totalAm =
                  editedItem.fGrupo +
                  editedItem.fAyudante +
                  editedItem.fMaestro +
                  editedItem.fanfitrion +
                  editedItem.felipes +
                  editedItem.discipulos +
                  editedItem.niñosA +
                  editedItem.amigosA +
                  editedItem.reconciliados +
                  editedItem.nuevos)
              }}
              Personas</span
            >
          </div>
        </v-card>

        <!-- TARJETA CONVERSIONES -->
        <v-card class="cardInf" elevation-1>
          <v-row justify="center">
            <h2>Conversiones</h2>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.adultos"
                label="Adultos"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.niñosC"
                label="Niños"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <div style="margin: 30px 50px 10px 20px">
            <span class="black--text"
              >Total:
              {{
                (editedItem.totalC = editedItem.adultos + editedItem.niñosC)
              }}
              Personas</span
            >
          </div>
        </v-card>

        <!-- TARJETA ASIS DOM -->
        <v-card class="cardInf" elevation-1>
          <v-row justify="center">
            <h2>Asistencia Dominical</h2>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.hermanos"
                label="Hermanos"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.amigosAD"
                label="Amigos"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.niñosAD"
                label="Niños"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <div style="margin: 30px 50px 10px 20px">
            <span class="black--text"
              >Total :
              {{
                (editedItem.totalAD =
                  editedItem.hermanos +
                  editedItem.amigosAD +
                  editedItem.niñosAD)
              }}
              Personas</span
            >
          </div>
        </v-card>

        <!-- TARJETA Finanzas-->
        <v-card class="cardInf" elevation-1>
          <v-row justify="center">
            <h2>Finanzas</h2>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.diezmo"
                label="Diezmo"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.ofrenda"
                label="Ofrendas"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                min="0"
                v-model.number="editedItem.otros"
                label="Otros"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <div style="margin: 30px 50px 10px 20px">
            <span class="black--text"
              >Total :
              {{
                (editedItem.totalF =
                  editedItem.diezmo + editedItem.ofrenda + editedItem.otros)
              }}</span
            >
          </div>
        </v-card>

        <!-- TARJETA DATOS-->
        <v-card class="cardInf" elevation-1>
          <v-row justify="center">
            <h2>Datos</h2>
          </v-row>
          <v-row justify="center" align-content="between">
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.codigo"
                label="Codigo"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="editedItem.tipo"
                label="Tipo"
                :items="tipos"
                outlined
              ></v-select>
            </v-col>

            <v-col>
              <div style="margin: 30px 50px 10px 20px">
                <span class="black--text"
                  >Asistencia Total :
                  {{
                    (editedItem.total =
                      editedItem.totalAD +
                      editedItem.totalAm +
                      editedItem.totalC)
                  }}
                  Personas</span
                >
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    snackbar: false,
    idR: "",
    msg: "",
    checkFG: 0,
    checkFA: 0,
    checkFM: 0,
    checkFAN: 0,
    search: "",
    dialog: false,
    muestra: 0,
    informes: [],
    tipos: ["GB", "SR", "R", "IGL"],

    informeDetalle: {},
    infDetail: {
      fgrupo: "",
      fayudante: "",
      fanfitrion: "",
      fmaestro: "",
      felipes: "",
      discipulos: "",
      amigosA: "",
      niñosA: "",
      reconciliados: "",
      nuevos: "",
      adultos: "",
      niñosC: "",
      hermanos: "",
      amigosAD: "",
      niñosAD: "",
      diezmo: "",
      ofrenda: "",
      otros: "",
    },

    datosUsuario: {},
    detalle: {
      estado: "",
      fecha: "",
      codigo: "",
      usuario: "",
      total: "",
      totalAm: "",
      totalAD: "",
      totalC: "",
      totalF: "",
      fGrupo: "",
      fAyudante: "",
      fMaestro: "",
      fAnfitrion: "",
      felipes: "",
      discipulos: "",
      niñosA: "",
      amigosA: "",
      reconciliados: "",
      nuevos: "",
      adultos: "",
      niñosC: "",
      hermanos: "",
      amigosAD: "",
      niñosAD: "",
      diezmo: "",
      ofrenda: "",
      otros: "",
    },
    headers: [
      { text: "Fecha", value: "createAt" },
      { text: "Código", value: "codigo" },
      { text: "Usuario", value: "usuario.nombre" },
      { text: "Tipo", value: "tipo" },
      { text: "Total Personas", value: "total" },
      { text: "Estado", value: "estado" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      codigo: "",
      fGrupo: 0,
      fAyudante: 0,
      fanfitrion: 0,
      fMaestro: 0,
      felipes: 0,
      discipulos: 0,
      amigosA: 0,
      niñosA: 0,
      reconciliados: 0,
      nuevos: 0,
      adultos: 0,
      niñosC: 0,
      hermanos: 0,
      amigosAD: 0,
      niñosAD: 0,
      diezmo: 0,
      ofrenda: 0,
      otros: 0,
      tipo: "",
    },
    bd: 0,
  }),

  created() {
    this.listarInformes();
    this.checkToken();
  },

  methods: {
    checkToken() {
      var token = this.$store.state.token;
      if (!token) {
        this.$router.push("/");
      }
    },

    cambiarPagina(num, item) {
      if (num == 0) {
        this.muestra = num;
        this.limpiarCajas();
      } else if (num == 1) {
        this.muestra = num;
        this.listarInformeDetalle(item);
      } else {
        this.muestra = num;
        // this.traerVentaDetalle(item);
      }
    },

    listarInformes() {
      let id = this.$store.state.idInf;
      console.log(id);
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`informe/iDL/${id}`, header)
        .then((response) => {
          console.log(response.data.informe);
          this.informes = response.data.informe;
          console.log(this.informes);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    listarInformeDetalle(item) {
      console.log(item);
      let id = item._id;
      console.log(id);
      let header = { headers: { token: this.$store.state.token } };

      axios
        .get(`informe/${id}`, header)
        .then((response) => {
          this.detalle.estado = response.data.informe.estado;
          this.detalle.fecha = response.data.informe.createAt;
          this.detalle.codigo = response.data.informe.codigo;
          this.detalle.usuario = response.data.informe.usuario;
          this.detalle.total = response.data.informe.total;
          this.detalle.totalAm = response.data.informe.totalAm;
          this.detalle.totalAD = response.data.informe.totalAD;
          this.detalle.totalC = response.data.informe.totalC;
          this.detalle.totalF = response.data.informe.totalF;
          this.detalle.fGrupo = response.data.informe.fGrupo;
          this.detalle.fAyudante = response.data.informe.fAyudante;
          this.detalle.fMaestro = response.data.informe.fMaestro;
          this.detalle.fAnfitrion = response.data.informe.fAnfitrion;
          this.detalle.felipes = response.data.informe.felipes;
          this.detalle.discipulos = response.data.informe.discipulos;
          this.detalle.niñosA = response.data.informe.niñosA;
          this.detalle.amigosA = response.data.informe.amigosA;
          this.detalle.reconciliados = response.data.informe.reconciliados;
          this.detalle.nuevos = response.data.informe.nuevos;
          this.detalle.adultos = response.data.informe.adultos;
          this.detalle.niñosC = response.data.informe.niñosC;
          this.detalle.hermanos = response.data.informe.hermanos;
          this.detalle.amigosAD = response.data.informe.amigosAD;
          this.detalle.niñosAD = response.data.informe.niñosAD;
          this.detalle.diezmo = response.data.informe.diezmo;
          this.detalle.ofrenda = response.data.informe.ofrenda;
          this.detalle.otros = response.data.informe.otros;
          console.log(this.detalle.usuario);
          this.traerUsuario(this.detalle.usuario);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    llenarInformeDetalle(informeDetalle) {
      // console.log(ventaConDetalleDetalles);
      var aPush = {};
      informeDetalle.map(function () {
        // aPush.push({
        //   _id:x._id,
        //   fGrupo:x.fGrupo,
        //   fAyudante:x.fAyudante,
        //   fAnfitrion:x.fAnfitrion,
        //   fMaestro:x.fMaestro,
        //   felipes:x.felipes,
        //   discipulos:x.discipulos,
        //   amigosA : x.amigosA,
        //   niñosA : x.niñosA,
        //   reconciliados : x.reconciliados,
        //   nuevos :  x.nuevos,
        //   adultos: x.adultos,
        //   niñosC: x.niñosC,
        //   hermanos : x.hermanos,
        //   amigosAD: x.amigosAD,
        //   niñosAD:x.niñosAD,
        //   diezmo :x.diezmo,
        //   ofrenda:x.ofren,
        //   otros:x.otros
        // })
      });
      // console.log(aPush);
      this.infDetail = aPush;
    },

    traerUsuario(item) {
      let id = item;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`usuario/${id}`, header)
        .then((response) => {
          console.log(response);
          this.datosUsuario = response.data.usuario;
        })
        .catch((error) => {
          console.log(error.response);
          if (!error.response.data.msg) {
            console.log(error.response);
            this.msgError = error.response.data.errors[0].msg;
            this.msjcompra(this.msgError);
          } else {
            this.msgError = error.response.data.msg;
            console.log(error.response.data.msg);
            this.msgError = error.response.data.msg;
            this.msjcompra(this.msgError);
          }
        });
    },

    guardar() {
      console.log("guardando");
      let header = { headers: { token: this.$store.state.token } };
      let errorA = [];
      const me = this;
      axios
        .post(
          "informe",
          {
            codigo: this.editedItem.codigo,
            tipo: this.editedItem.tipo,
            usuario: this.$store.state.idUser,
            iDL: this.$store.state.idInf,
            total: this.editedItem.total,
            totalAm: this.editedItem.totalAm,
            totalAD: this.editedItem.totalAD,
            totalC: this.editedItem.totalC,
            totalF: this.editedItem.totalF,
            fGrupo: this.editedItem.fGrupo,
            fAyudante: this.editedItem.fAyudante,
            fMaestro: this.editedItem.fMaestro,
            fAnfitrion: this.editedItem.fanfitrion,
            felipes: this.editedItem.felipes,
            discipulos: this.editedItem.discipulos,
            niñosA: this.editedItem.niñosA,
            amigosA: this.editedItem.amigosA,
            reconciliados: this.editedItem.reconciliados,
            nuevos: this.editedItem.nuevos,
            adultos: this.editedItem.adultos,
            niñosC: this.editedItem.niñosC,
            hermanos: this.editedItem.hermanos,
            amigosAD: this.editedItem.amigosAD,
            niñosAD: this.editedItem.niñosAD,
            diezmo: this.editedItem.diezmo,
            ofrenda: this.editedItem.ofrenda,
            otros: this.editedItem.otros,
          },
          header
        )
        .then((response) => {
          console.log(response);
          me.snackbar = true;
          me.msg = "Informe guardado con éxito";
          me.listarInformes();
          me.limpiarCajas();
          me.muestra = 0;
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
            `informe/desactivar/${id}`,
            {
              estado: 0,
            },
            header
          )
          .then(function () {
            me.listarInformes();
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
            `informe/activar/${id}`,
            {
              estado: 1,
            },
            header
          )
          .then(function () {
            me.listarInformes();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    editar(item) {
      console.log(item);
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
      (this.dialog = false),
        (this.editedItem.codigo = ""),
        (this.editedItem.tipo = ""),
        (this.editedItem.fGrupo = 0),
        (this.editedItem.fAyudante = 0),
        (this.editedItem.fanfitrion = 0),
        (this.editedItem.fMaestro = 0),
        (this.editedItem.felipes = 0),
        (this.editedItem.discipulos = 0),
        (this.editedItem.amigosA = 0),
        (this.editedItem.niñosA = 0),
        (this.editedItem.reconciliados = 0),
        (this.editedItem.nuevos = 0),
        (this.editedItem.adultos = 0),
        (this.editedItem.niñosC = 0),
        (this.editedItem.hermanos = 0),
        (this.editedItem.amigosAD = 0),
        (this.editedItem.niñosAD = 0),
        (this.editedItem.diezmo = 0),
        (this.editedItem.ofrenda = 0),
        (this.editedItem.otros = 0);
    },
  },

  computed: {
    totalAsist() {
      var sumaA =
        this.editedItem.fGrupo +
        this.editedItem.fAyudante +
        this.editedItem.fMaestro +
        this.editedItem.fAnfitrion +
        this.editedItem.felipes +
        this.editedItem.discipulos +
        this.editedItem.niñosA +
        this.editedItem.amigosA +
        this.editedItem.reconciliados +
        this.editedItem.nuevos;
      return sumaA;
    },
  },
};
</script>

<style>
.cardInf {
  padding: 15px;
  margin: auto;
  margin-top: 20px;
  width: 1300px;
}

.table {
  padding: 10px;
}
</style>      