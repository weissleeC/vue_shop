<template>
  <el-container>
    <el-header>
      <div class="header-logo">
        <img src="../assets/logo.png" alt="电商后台管理系统" />
        <h1>电商后台管理系统</h1>
      </div>
      <el-button type="info" @click="logout" size="mini">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="menus-menu">
          <div class="menus-menu__body">
            <el-menu
              background-color="#1e222d"
              text-color="#fff"
              active-text-color="#409eff"
              :default-active="defaultActive"
              unique-opened
              router
              :collapse-transition="false"
              :collapse="isCollapse"
            >
              <!-- 一级菜单 -->
              <el-submenu
                :index="String(item.id)"
                v-for="item in menulist"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="iconsBoj[item.id]"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item-group>
                  <el-menu-item
                    :index="`/${subItem.path}`"
                    v-for="subItem in item.children"
                    :key="subItem.id"
                  >
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span> {{ subItem.authName }}</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
          <div class="menus-menu__footer">
            <div class="menus-menu__fold" @click="toggleCollapse">
              <i
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              ></i>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <!-- 路由占位 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsBoj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-check',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing',
      },
      isCollapse: false,
      defaultActive: this.$route.path,
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    // 退出登陆
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取左侧导航
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    // 切换菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #262f3e;
  .header-logo {
    font-size: 0;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    h1 {
      font-size: 18px;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #1e222d;
}
.el-menu {
  border-right: none;
}
/deep/ .el-menu-item-group__title {
  display: none;
}
.menus-menu {
  position: relative;
  width: 100%;
  display: flex;
  -moz-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  height: 100%;
  vertical-align: top;
  &__body {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
  }
  &__footer {
    height: 56px;
    background-color: #262f3e;
  }
  &__fold {
    width: 64px;
    height: 100%;
    bottom: 0;
    left: 0;
    top: auto;
    border: 0;
    z-index: 1000;
    position: relative;
    cursor: pointer;
    &:hover {
      background-color: #344258;
    }
    .el-icon-s-fold,
    .el-icon-s-unfold {
      color: #fff;
      font-size: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.el-main {
  background-color: #f2f2f2;
}
</style>
