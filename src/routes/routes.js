import grupoBiblico from '../pages/GrupoBiblico.vue'
import listGrupos from '../pages/ListGrupos.vue'
import subRed from '../pages/SubRed.vue'
import listSubRed from '../pages/ListSubRed.vue'
import Red from '../pages/Red.vue'
import listRed from '../pages/ListRed.vue'
import directorio from '../pages/Directorio.vue'
import login from '../pages/Login.vue'
import usuario from '../pages/Usuario.vue'
import tablero from '../pages/Tablero.vue'
import prueba from '../pages/prueba.vue'
import informe3 from '../pages/informe3.vue' 
import informe2 from '../pages/informe2.vue'
import grafica from '../pages/grafica.vue'
import listIglesia from '../pages/ListIglesia.vue'

export const routes = [
    {path: "/", component: login},
    // {path: "/login", component: login},
    {path: "/grupoBiblico", component: grupoBiblico},
    {path: "/directorio", component: directorio},
    {path: "/listGrupos", component: listGrupos},
    {path: "/subRed", component: subRed},
    {path: "/listSubRed", component: listSubRed},
    {path: "/Red", component: Red},
    {path: "/listRed", component: listRed},
    {path: "/Usuario", component: usuario},
    {path: "/Tablero", component: tablero},
    {path: "/prueba", component: prueba},
    {path: "/informe3", component: informe3},
    {path: "/informe2", component: informe2},
    {path: "/grafica", component: grafica},
    {path: "/listIglesia", component: listIglesia},
]