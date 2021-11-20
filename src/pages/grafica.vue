<template>
  <div class="ex2">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";
export default {
  data() {
    return {
      codigo: [],
      total: [],
    };
  },
  created(){
    this.checkToken();
  },

  methods: {
    checkToken(){
      var token = this.$store.state.token
      if (!token) {
          this.$router.push("/");
      }
    },

    async graficar() {
      let id = this.$store.state.idInf;
      let me = this;
      let infoArray = [];
      let header = { headers: { token: this.$store.state.token } };

      await axios.get(`informe/iDL/${id}`, header).then(function (response) {
        infoArray = response.data.informe;
        console.log(response.data.informe);
        infoArray.map(function (x) {
          me.codigo.push(x.createAt.split("T")[0]);
          me.total.push(x.total);
        });
      });

      let ctx = document.getElementById("myChart");
      /* eslint-disable no-unused-vars */
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: me.codigo,
          datasets: [
            {
              label: "Informe",
              data: me.total,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(25, 80, 130, 0.2)",
                "rgba(25, 255, 12, 0.2)",
              ],
              borderColor: [
                "rgba(255,  99, 132, 1)",
                "rgba( 54, 162, 235, 1)",
                "rgba(255, 206,  86, 1)",
                "rgba( 75, 192, 192, 1)",
                "rgba( 25,  80, 130, 1)",
                "rgba( 25, 255,  12, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
  },
  mounted() {
    this.graficar();
  },
};
</script>
 
<style>
.ex2 {
  margin: 100px;
}
</style>