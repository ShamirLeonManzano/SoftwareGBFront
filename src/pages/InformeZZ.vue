<template>
    <div>
        <v-container v-if="mostrar==0">
        <v-data-table :headers="headers" :items="usuarios" :search="search" sort-by="codigo" class="table">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Usuario</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field id="brSea" v-model="search" append-icon="mdi-magnify"  label="Buscar por Nombre o Código" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                      <v-dialog  v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Nueva </v-btn>
                        </template>
                    <v-card>
                      <v-card-title>
                          <span class="text-h5">Usuario</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                <v-row>
                  <v-col cols="3" >
                    <v-text-field
                      v-model="editedItem.codigo"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="9" >
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
                  
                  <v-col cols="4" >
                    <v-select
                      v-model="editedItem.rol"
                      :items="roles"
                      label="Rol"
                    ></v-select>
                  </v-col>

                  <v-col cols="5" >
                    <v-text-field
                      v-model="editedItem.telefono"
                      label="Telefono"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" >
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>

                    <v-col cols="6" >
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
              <v-btn color="blue darken-1" text  @click="limpiarCajas()">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="guardar()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
      </v-toolbar>
    </template>
    <template v-slot:[`item.opciones`]="{ item }">
      
      <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon small class="mr-2" @click="editar(item)" v-bind="attrs" v-on="on" > mdi-pencil </v-icon>
        </template>
            <span>Editar</span>
            </v-tooltip>

      <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
      <template v-if="item.estado">
          <v-icon small @click="activarDesactivarMostrar(2, item)" v-bind="attrs" v-on="on">
            mdi-block-helper
          </v-icon>
        </template>

        <template v-else>
          <v-icon small @click="activarDesactivarMostrar(1, item)" v-bind="attrs" v-on="on">
            mdi-check
          </v-icon>
        </template>
        </template>            
            <span>Activar/Desactivar</span>
            </v-tooltip>
    </template>

    <template v-slot:[`item.estado`]="{ item }">
      <span class="blue--text" v-if="item.estado == 1">Activo
      </span>
      <span class="red--text" v-if="item.estado == 0">Inactivo
      </span>
    </template>
  </v-data-table>
  </v-container>

            <template>
                <v-container v-model="mostrar" v-if="mostrar==1">
            <!-- <v-card class="cardsInforme"> -->   
            <v-card class="mx-auto" outlined max-width="1250" >
                    <v-toolbar color="blue accent-4" dark max-height="50px">
                        <v-toolbar-title style="color:black">
                            Asistencia
                        </v-toolbar-title>
                    </v-toolbar>
                
                <v-container>
                <v-row justify="center">
                    <v-col cols="3"  align-self="auto">                    
                    <v-checkbox class="checkBox" v-model="ex4"  label="Felipe Grupo" color="indigo darken-3" value="indigo darken-3"  ></v-checkbox>            
                    </v-col>

                <v-col cols="3" >
                    <v-checkbox class="checkBox" v-model="ex4" label="Felipe Ayudante" color="indigo darken-3" value="indigo darken-3" ></v-checkbox>            
                </v-col>

                <v-col cols="3" >
                    <v-checkbox class="checkBox" v-model="ex4" label="Felipe Maestro" color="indigo darken-3" value="indigo darken-3" ></v-checkbox>            
                </v-col>

                <v-col cols="3" >
                    <v-checkbox class="checkBox" v-model="ex4" label="Felipe Anfitrión" color="indigo darken-3" value="indigo darken-3" ></v-checkbox>            
                </v-col>

                </v-row > 
                </v-container>
                
                <v-container>
                <v-row justify="center">
                <v-col >
                    <span>Felipes:</span>
                </v-col>                
                <v-col>
                    <v-text-field class="inputs"  hide-details="auto" type="number" single-line min="0"></v-text-field>

                </v-col>
                    <!-- <v-text-field class="inputs" value="0" min="0" type="number" single-line  ></v-text-field>                 -->
                <v-col >
                    <span>Amigos:</span>
                    <!-- <v-text-field class="inputs" value="0" min="0" type="number"></v-text-field> -->
                </v-col>
                
                
                <v-col >
                    <span>Reconciliados:</span>
                    <!-- <v-text-field class="inputs" value="0" min="0" type="number"></v-text-field> -->
                </v-col>
                
                
                <v-col >
                    <span>Discipulos:</span>
                    <!-- <v-text-field class="inputs" value="0" min="0" type="number" single-line ></v-text-field> -->
                </v-col>
                
                
                </v-row>
                
                <v-row>   
                </v-row>

                <v-row>
                    <v-col>
                        <p>Nuevos: </p>
                        <!-- <v-text-field class="inputs" value="0" min="0" type="number"></v-text-field> -->
                    </v-col>
                
                    <v-col>
                        <v-header>Niños:</v-header>
                        <!-- <v-text-field class="inputs" value="0" min="0" type="number"></v-text-field> -->
                    </v-col>

                    <v-col>
                        <v-header>Total:</v-header>
                        <span> X Personas</span>
                    </v-col>
                </v-row>
                </v-container>
            </v-card>

            <v-card class="mx-auto" outlined max-width="1250" style="margin-bottom:10">
                <v-toolbar color="indigo darken-3" dark max-height="50px">
                        <v-toolbar-title>
                            Conversiones
                        </v-toolbar-title>
                    </v-toolbar>
        
                <v-container>
                <v-row justify="center">
                <v-col cols="12" sm="4">
                    <v-header>Adultos:</v-header>
                    <v-text-field class="inputs" value="0" type="number" single-line ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                    <p>Niños: </p>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="4 ">
                    <v-header>Total:</v-header>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>
                </v-row>
                </v-container>
            </v-card>

            <v-card class="mx-auto" outlined max-width="1250" style="margin-bottom:10">
                <v-toolbar color="indigo darken-3" dark max-height="50px">
                        <v-toolbar-title>
                            Asistencia Dominical
                        </v-toolbar-title>
                    </v-toolbar>
        
                <v-container>
                <v-row justify="center">
                <v-col cols="3" >
                    <v-header>Hermanos:</v-header>
                    <v-text-field class="inputs" value="0" type="number" single-line ></v-text-field>
                </v-col>

                <v-col cols="3" >
                    <p>Amigos: </p>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>
                
                <v-col cols="3" >
                    <v-header>Niños:</v-header>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>

                <v-col cols="3" >
                    <v-header>Total:</v-header>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>
                </v-row>
                </v-container>
            </v-card>

            <v-card class="mx-auto" outlined max-width="1250" style="margin-bottom:10">
                <v-toolbar color="indigo darken-3" dark max-height="50px">
                        <v-toolbar-title>
                            Finanzas
                        </v-toolbar-title>
                    </v-toolbar>
        
                <v-container>
                <v-row justify="center">
                <v-col cols="3">
                    <v-header>Diezmos:</v-header>
                    <v-text-field class="inputs" value="0" type="number" single-line ></v-text-field>
                </v-col>

                <v-col cols="3">
                    <p>Ofrenda: </p>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>
                
                <v-col cols="3" >
                    <v-header>Total:</v-header>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>

                <v-col cols="3" >
                    <v-header>Otros:</v-header>
                    <v-text-field class="inputs" value="0" type="number"></v-text-field>
                </v-col>

                </v-row>
                </v-container>
            </v-card>
                </v-container>
            </template>
        
        <!-- </v-card> -->
    </div>
</template>

<script>
export default {
    data: () => ({
      headers: [
        { text: 'Fecha', value: 'createAt' },
        { text: 'Código', value: 'codigo' },
        { text: 'Usuario', value: 'tipo' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Total Personas', value: 'total'},        
        { text: 'Estado', value: 'estado' },
        { text: 'Opciones', value: 'opciones', sortable: false}, 
        ],
      rol:'FR',
      mostrar:0,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    // watch: {
    //   date (val) {
    //     this.dateFormatted = this.formatDate(this.date)
    //   },
    // },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
}
</script>

<style>
.datePicker{
    margin-left: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.headerInfo{
    min-width: 1375px;
    margin-left: 20px;
}

.checkBox{
    font-weight: bold;
}
.contInfo{
    margin: auto;       
}
.cardsInforme{
    padding: 15px;
    width: 1250px;
    margin: auto;
    margin-bottom: 20px;
    
}

.inputs{    
    width: 50px;
    border: transparent;
}

.titleInfo{
    margin-left: 300px;
}
.btn-pdf{
    
    margin-top: 12px;
}

</style>