<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('admin')
const password = ref('123456')
const remember = ref(true)
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  if (!username.value.trim() || !password.value) {
    error.value = '请输入账号和密码'
    return
  }
  loading.value = true
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value.trim(), password: password.value }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.detail || '登录失败')
    const storage = remember.value ? localStorage : sessionStorage
    storage.setItem('nebula-token', data.access_token)
    storage.setItem('nebula-user', JSON.stringify(data.user))
    router.push('/home')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-visual">
      <div class="visual-glow glow-one"></div>
      <div class="visual-glow glow-two"></div>
      <div class="brand-mark"><span>✦</span></div>
      <p class="eyebrow">NEBULA OPERATIONS</p>
      <h1>让每一次决策<br /><em>更接近事实。</em></h1>
      <p class="visual-copy">一站式业务运营工作台，连接数据、团队与增长，为复杂业务提供清晰答案。</p>
      <div class="visual-foot"><span class="status-dot"></span> 系统运行正常 <span class="dot-divider">·</span> v2.4.1</div>
    </section>

    <section class="login-panel">
      <div class="login-card">
        <div class="mobile-brand brand-mark"><span>✦</span></div>
        <p class="panel-kicker">欢迎回来</p>
        <h2>登录管理台</h2>
        <p class="panel-subtitle">使用您的工作账号继续访问</p>

        <form @submit.prevent="submit">
          <label for="username">账号</label>
          <div class="input-wrap"><span class="input-icon">◎</span><input id="username" v-model="username" autocomplete="username" placeholder="请输入账号" /></div>
          <label for="password">密码</label>
          <div class="input-wrap"><span class="input-icon">◆</span><input id="password" v-model="password" type="password" autocomplete="current-password" placeholder="请输入密码" /></div>
          <div class="form-options"><label class="check-label"><input v-model="remember" type="checkbox" /> <span>保持登录</span></label><a href="#" @click.prevent>忘记密码？</a></div>
          <p v-if="error" class="form-error">{{ error }}</p>
          <button class="primary-button" :disabled="loading">{{ loading ? '正在登录…' : '登录' }} <span>→</span></button>
        </form>
        <p class="login-hint">默认账号：admin &nbsp;·&nbsp; 密码：123456</p>
        <p class="copyright">© 2025 Nebula Systems. All rights reserved.</p>
      </div>
    </section>
  </main>
</template>
