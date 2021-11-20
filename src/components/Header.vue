<template>  
   <div  v-if="this.$store.state.token != ''" > 

   <v-app-bar color="#04253a" dark prominent height="50px">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn  @click="logOut()" dark icon>Salir<v-icon>mdi-logout</v-icon></v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      mobile-breakpoint="1"
      
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          
        >
        <!-- GRUPO IGLESIA -->
        <template v-if="this.$store.state.rol=='ADMIN_ROL' || this.$store.state.rol=='PS'">
          <v-list-group>
            <v-list-item slot="activator" to="/listIglesia">
              <v-list-item-content>
                <v-list-item-title>
                  <!-- <v-icon class="icons_groups" color="#04253a" left>inventory</v-icon> -->
                  Iglesia
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          
          <v-list-item to="/informe3">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>info</v-icon>
                Informe
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          

          <v-list-item to="/grafica">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>bar_chart</v-icon>
                Grafica
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          
          </v-list-group>
        </template>

        <!-- GRUPO REDES -->
        <template v-if="this.$store.state.rol=='ADMIN_ROL' || this.$store.state.rol=='PS' || this.$store.state.rol=='FS'">
          <v-list-group>
            <v-list-item slot="activator" to="/listRed">
              <v-list-item-content>
                <v-list-item-title>
                  <!-- <v-icon class="icons_groups" color="#04253a" left>shopping_cart</v-icon> -->
                  Redes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          <v-list-item to="/informe3">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>info</v-icon>
                Informe
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/grafica">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>bar_chart</v-icon>
                Gráfica
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         
          </v-list-group>   
        </template>

        <!-- SUB REDES -->

        <template v-if="this.$store.state.rol=='ADMIN_ROL' || this.$store.state.rol=='PS' || this.$store.state.rol=='FS' || this.$store.state.rol=='FR'">
          <v-list-group>
            <v-list-item slot="activator" to="/listSubRed">
              <v-list-item-content>
                <v-list-item-title>
                  <!-- <v-icon class="icons_groups" color="#04253a" left>point_of_sale</v-icon> -->
                  Sub Redes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          <v-list-item to="/informe3">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>info</v-icon>
               Informe
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/grafica">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>bar_chart</v-icon>
                Gráfica
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          

          </v-list-group>   
        </template>

         <!-- GRUPOS BIBLICOs -->

        <template v-if="this.$store.state.rol=='ADMIN_ROL' || this.$store.state.rol=='PS' || this.$store.state.rol=='FS' || this.$store.state.rol=='FR' || this.$store.state.rol=='FG'">
          <v-list-group>
            <v-list-item slot="activator" to="/listGrupos">
              <v-list-item-content>
                <v-list-item-title>
                  <!-- <v-icon class="icons_groups" color="#04253a" left>storefront</v-icon> -->
                  Grupos Biblicos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>


           <v-list-item to="/informe2">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>info</v-icon>
                Informe
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/grafica">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>bar_chart</v-icon>
                Gráfica
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/directorio">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>groups</v-icon>
                Directorio
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          

          </v-list-group>   
        </template>

        <!-- GRUPO ACCESOS -->

        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>                  
                  Accesos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          <v-list-item to="/usuario"  v-if="this.$store.state.rol=='ADMIN_ROL'" >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>people</v-icon>
                Usuarios
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/tablero">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="icons_groups" color="rgba(4, 37, 58, 0.6)" left small>dashboard</v-icon>
                Tablero
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          </v-list-group>   
        </template>
          
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  
  </div>
    
</template>

<script>
export default {
    data: () => ({
      token: '',
      drawer : false,
      group : null,
      
    }),

    methods:{
      logOut(){
        this.$router.push("/");
        this.$store.dispatch("setToken", this.token);
      }
    },
}
</script>

<style>

</style>