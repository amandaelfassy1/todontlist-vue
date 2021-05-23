<template>
  <div class="container text-center pt-5">
        <div class="row">
            <div class="col">
                <img class="cake" src="../../public/accueil.jpg" alt="">
            </div>
            <div class="col pt-5">
                <h1 class="pt-3 text-primary">To Don't List !</h1>
                <h4>
                  Connecte-toi, <br>et crée ta ToDon'tList !<br> Toutes tes tâches à ne <br>surtout pas faire ! 
                </h4>
            </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img{
  width: 75%;
}
h1{
  font-size: 60px;
}
h4{
  line-height: 70px;
  font-size: 40px;
}
</style>
