<template>
    <div>
        
        <v-container class="headerInfo" fixed>
            <v-row no-gutters>
                <v-col cols="12" sm="3" >
                    <v-card class="pa-2" outlined >
                        Eliécer Guerrero Ballesteros
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

        <v-card class="contInfo" outlined>
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

            <v-card class="cardsInforme">
                <v-list-item three-line>
                    <v-list-item-content> 
                        <v-list-item-title class="text-h5 mb-1">Asistencia</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
        
                <v-row>
                    <v-col cols="12" sm="3" >
                    <span>Felipes Grupo: </span> 
                </v-col>

                <v-col cols="12" sm="3">
                    <span>Felipes Ayudante: </span>  
                </v-col>

                <v-col cols="12" sm="3">
                    <span>Felipes Maestro: </span> 
                </v-col>

                <v-col cols="12" sm="3">
                    <span>Felipes Anfitrión: </span>   
                </v-col>

                </v-row>
                
                <v-row>
                <v-col>
                    <span>Felipes:
                        ______
                    </span>
                    
                </v-col>

                <v-col>
                    <span>Amigos:_____</span>
                        
                    </v-col>
                
                <v-col>
                    <span>Reconciliados:_____ </span>
                       </v-col>

                <v-col>
                    <span>Discipulos:_____</span>
                    
                </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="3">
                        <span>Nuevos: _____</span>
                    </v-col>
                
                    <v-col cols="12" sm="3">
                        <span>Niños:_____</span>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-header>Total:</v-header>
                        <span> X Personas</span>
                    </v-col>
                </v-row>
            </v-card>

            <v-card class="cardsInforme">
                <v-list-item three-line>
                    <v-list-item-content> 
                    <v-list-item-title class="text-h5 mb-1">Conversiones</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
        
                
                <v-row>
                <v-col cols="12" sm="4">
                    <v-header>Adultos:</v-header>
                    <span>________</span>
                </v-col>

                <v-col cols="12" sm="4">
                    <span>Niños: ________</span>   
                </v-col>
                
                <v-col cols="12" sm="4 ">
                    <v-header>Total:</v-header>
                    <span>________</span>
                </v-col>
                </v-row>
            </v-card>

            <v-card class="cardsInforme">
                <v-list-item three-line>
                    <v-list-item-content> 
                        <v-list-item-title class="text-h5 mb-1">Asistencia Dominical</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
        
                
                <v-row>
                <v-col cols="12" sm="4">
                    <v-header>Hermanos:
                        <span>______</span>
                    </v-header>
                    
                </v-col>

                <v-col cols="12" sm="4">
                    <p>Amigos: 
                        <span>______</span>
                    </p>
                    
                </v-col>
                
                <v-col cols="12" sm="4 ">
                    <v-header>Niños:
                        <span>______</span>
                    </v-header>
                    
                </v-col>

                <v-col cols="12" sm="4 ">
                    <v-header>Total:
                        <span>______</span>
                    </v-header>
                    
                </v-col>
                </v-row>
            </v-card>

            <v-card class="cardsInforme">
                <v-list-item three-line>
                    <v-list-item-content> 
                        <v-list-item-title class="text-h5 mb-1">Finanzas</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
        
                
                <v-row>
                <v-col cols="12" sm="3">
                    <v-header>Diezmos:<span>______</span></v-header>
                    
                </v-col>

                <v-col cols="12" sm="3">
                    <p>Ofrenda: <span>______</span> </p>
                    
                </v-col>
                
                <v-col cols="12" sm="3 ">
                    <v-header>Total:<span>______</span></v-header>
                    
                </v-col>

                <v-col cols="12" sm="3">
                    <v-header>Otros:<span>______</span></v-header>
                    
                </v-col>

                </v-row>

            </v-card>

        </v-card>
    </div>
</template>

<script>
export default {
    data: vm => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
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
    padding: 10px;
    width: 1280px;
    margin: auto;       
}
.cardsInforme{
    padding: 15px;
    
    margin: auto;
    margin-bottom: 20px;
    
}

.inputs{
    margin-left: 70px;
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