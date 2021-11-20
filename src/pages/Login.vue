<template>
    <div id="_login"> 
        
        <v-container >
            <v-card width="450px" class="cardL" >
                    <div class="app">

                    <v-img id="img" src="../assets/fond2.jpg"></v-img>
                    <div id="circle">
                        <div id="logo" >
                        <v-img id="logoimg" src="../assets/logollamas.png" ></v-img>
                        </div>
                    </div>
                                
                    <v-container id="cont" style="text-align: center">
                    <h2>Inicio Sesión</h2>
                    <v-text-field class="fields" v-model="email" label="E-mail" append-icon="email"  ></v-text-field>  
                    <v-text-field class="fields" v-model="pass" label="Password" append-icon="lock" type="password" v-on:keyup.enter="ingresar()"></v-text-field>
                    
                    <v-btn id="btn_login" dark color="#04253a" @click="ingresar()" center> Ingresar </v-btn>
                    
                    <br>
                    <!-- <router-link class="recovery" to="/recovery">¿Olvidó su contraseña?</router-link> -->
                    </v-container>

                    <!-- <v-container>
                        <v-row justify="center">
                           <v-btn icon href="https://www.youtube.com/user/CCElShaddayElohim">
                               <v-icon color="red" size="250%" >mdi-youtube</v-icon>
                           </v-btn>
                           <v-btn icon >
                               <v-icon color="#3b5998" size="250%">mdi-facebook</v-icon>
                           </v-btn>
                        </v-row>
                    </v-container> -->
               
                </div>
            </v-card>
        </v-container>

        <template>
            <v-snackbar v-model="snackbar">
              {{ msg }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="warning"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Cerrar
                </v-btn>
              </template>
            </v-snackbar>    
          </template>
    </div>   
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            snackbar:false,
            msg:'Credenciales incorrectas. Inténtelo de nuevo',
            pass:"",
            email:""
        }  
    },
    methods: {
        ingresar(){
            axios.post("usuario/login", {email:this.email, password:this.pass})
            .then(response =>{   
                // console.log(response.data);             
                this.$store.dispatch("setToken", response.data.token);
                this.$store.dispatch("setRol", response.data.usuario.rol);
                this.$store.dispatch("setIdUser", response.data.usuario._id)
                console.log(response.data.usuario._id);
                console.log(response.data.usuario.rol);
                console.log(this.$store.state.rol) 
                console.log(response.data.token);
                this.$router.push("/listIglesia");

            }).catch((error)=>{
                console.log(error);
                this.snackbar=true
            })
        }
    },    
}
</script>


<style scoped>

#_login{
    background-image: url("../assets/1.jpg"); 
    background-size: cover;
    width: 100%;
    height: 100vh;
}
#cont{
    padding: 30px;
    margin-top: -30px ;
    border-radius: initial;
}
#img{
    border-radius: initial;
    -webkit-clip-path: polygon(0 0, 0 200px, 200px 160px, 200px 0);
    clip-path: polygon(0 0, 0 292px, 600px 160px, 1200px 0);
}
.app{
    margin: auto;
    position: relative;
    height: 100%;
    box-shadow: 0px 0px 105px 22px rgba(0, 0, 0, 0.637);
    background-color: rgba(255, 255, 255, 0.151);
    border-radius: initial;
}

.app h1 {
    text-align: center;
}

.cardL{
    margin:auto;
    margin-top: 35px;
    height: 580px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.090);
}

#login h1{
    margin-top: -20px;
    margin-bottom: 20px;
    color: #04253a;
}


.fields{
    width: 380px;
}
#circle {
     position: absolute;
     width: 100px;
     height: 100px;
     -moz-border-radius: 50%;
     -webkit-border-radius: 50%;
     border-radius: 50%;
     background: #ffffff;
     left: 165px; 
     top: 190px;
}

#logo{
    width: 150px;
}
#logoimg{
     left: -22px; 
     top: -25px;
}
.recovery{
    margin-left: 70px;
}
</style>