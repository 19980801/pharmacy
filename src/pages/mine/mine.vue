<template>
  <div class="mine">
    <div class="mineBox">
      <div class="menuList">
        <ul>
          <li>学习记录</li>
          <li>我的收藏</li>
          <li>学习任务</li>
          <li>我的订单</li>
          <li>会员管理</li>
          <li>个人设置</li>
          <li>职业认证</li>
          <li>我的反馈</li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="less">
.mine {
  width: 100%;
  background: rgba(245, 246, 246, 1);
  height: 100vh;
  .mineBox {
    width: 1200px;
    height: 100px;
    padding: 30px 0;
    margin: 0 auto;
    .menuList {
      background: #fff;
      width: 220px;
      ul {
        padding: 10px 0;
        li {
          text-align: center;
          font-size: 14px;
          font-family: PingFang-SC-Heavy, PingFang-SC;
          font-weight: 800;
          color: #666666;
          line-height: 60px;
        }
      }
    }
  }
}
</style>
