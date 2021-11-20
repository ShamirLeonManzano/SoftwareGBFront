<template>
    <div role="form">
        <form>
            <div class="form-group">
                <label class="btn btn-primary">
                    <i class="fa fa-folder-open-o" aria-hidden="true"></i>&nbsp;Seleccionar un archivo
                    <input type="file" accept=".pdf" @change="onFileSelected" name="myfile">
                </label>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "my-component",
        methods: {
            onFileSelected (event) {
               const file = event.target.files[0];
               const formData = new FormData();
               formData.append("my-file", file);
               axios.post(``, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
               })
                .then(res => {
                    //todo ok
                    console.log(res);
                },
                error => {
                    //todo mal :P
                    console.log(error);
                })
            }
        }
    }
</script>