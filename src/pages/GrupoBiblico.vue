<template>
    <div>
        <div>
            <!-- menú superior -->
            <template v-if="rol=='FR'"> 
                <v-tabs fixed-tabs >
                <v-tab to="/grupoBiblico" >Informe</v-tab>
                <v-tab>Grafica</v-tab>
                <v-tab to="/directorio">Directorio</v-tab>
                </v-tabs>
            </template>
        </div>
        <v-container class="headerInfo">
            <v-row no-gutters>
                <v-col cols="12" sm="3" >
                    <v-card class="pa-2" outlined >
                        ---------------
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="3" >
                    <v-card class="pa-2" outlined >
                      ----------
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="3" >
                    <v-card class="pa-2" outlined >
                      ----------
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="2 " >
                    <v-card class="pa-2" outlined >
                      Cod Red:
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" sm="2" >
                    <v-card class="pa-1" outlined >
                        Pastor Supervisor
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="1" >
                    <v-card class="pa-1" outlined >
                      Cod:
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="2" >
                    <v-card class="pa-1" outlined >
                      Felipe Red: 
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="1" >
                    <v-card class="pa-1" outlined >
                      Cod:
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="2" >
                    <v-card class="pa-1" outlined >
                      Felipe Grupo: 
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="1" >
                    <v-card class="pa-1" outlined >
                      Cod:
                    </v-card>
                </v-col>
                <v-col cols="12"  sm="2 " >
                    <v-card class="pa-1" outlined >
                      Cod Grupo Biblico:
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-spacer></v-spacer>

        
            <v-row>
                <v-col cols="2" >
                    <div class="datePicker">
                    <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateFormatted"
                            label="Date"
                            hint="MM/DD/AAAA"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            @blur="date = parseDate(dateFormatted)"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu1 = false"
                    ></v-date-picker>
                    </v-menu>
                    </div>
                </v-col>
                <v-col cols="8" >
                    <v-card-title id="title" class="titleInfo" >INFORME</v-card-title>
                </v-col>
                <v-col cols="2" >
                    <v-btn class="btn-pdf" color="primary">Descargar PDF</v-btn>
                </v-col>
            </v-row>

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

        <!-- </v-card> -->
    </div>
</template>

<script>
export default {
    data: vm => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      rol:'FR',
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