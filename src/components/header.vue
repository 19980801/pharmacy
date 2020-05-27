<template>
  <header>
    <img src="../assets/imgs/header.png" class="header_img">
    <img src="../assets/imgs/logo.png" class="logo">
  </header>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="less">
  header{
    .header_img{
      width:100%;
      height:auto;
    }
    .logo{
      position: absolute;
      left:0;
      right:0;
      margin:auto;
      top:0.3rem;
      width:2.3rem;
    }
  }
</style>
