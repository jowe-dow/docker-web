<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref('概览')
const menu = ['概览', '订单管理', '客户管理', '数据分析']
const stats = [
  { label: '本月总营收', value: '¥ 248,680', change: '+12.8%', tone: 'green', icon: '↗' },
  { label: '新增客户', value: '1,286', change: '+8.4%', tone: 'green', icon: '♧' },
  { label: '待处理订单', value: '86', change: '-3.2%', tone: 'orange', icon: '▣' },
  { label: '转化率', value: '24.6%', change: '+2.1%', tone: 'green', icon: '◌' },
]
const orders = [
  { id: '#NEB-240812', customer: '上海云帆科技', product: '企业增长方案', amount: '¥ 12,800', status: '已完成', statusClass: 'success', date: '2025-08-12 14:32' },
  { id: '#NEB-240811', customer: '杭州星河网络', product: '数据分析服务', amount: '¥ 8,600', status: '处理中', statusClass: 'processing', date: '2025-08-12 12:18' },
  { id: '#NEB-240810', customer: '深圳极光互动', product: '运营咨询服务', amount: '¥ 5,200', status: '待付款', statusClass: 'pending', date: '2025-08-11 18:45' },
  { id: '#NEB-240809', customer: '北京远见设计', product: '企业增长方案', amount: '¥ 16,400', status: '已完成', statusClass: 'success', date: '2025-08-11 10:27' },
]
const greeting = computed(() => new Date().getHours() < 12 ? '早上好' : new Date().getHours() < 18 ? '下午好' : '晚上好')

function logout() {
  localStorage.removeItem('nebula-token')
  localStorage.removeItem('nebula-user')
  sessionStorage.removeItem('nebula-token')
  sessionStorage.removeItem('nebula-user')
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar-brand"><div class="brand-mark small"><span>✦</span></div><span>NEBULA</span></div>
      <div class="workspace-switch"><div class="workspace-avatar">N</div><div><strong>星云运营中心</strong><small>主工作空间</small></div><span class="chevron">⌄</span></div>
      <p class="nav-label">工作台</p>
      <nav><button v-for="item in menu" :key="item" :class="['nav-item', { active: active === item }]" @click="active = item"><span class="nav-icon">{{ item === '概览' ? '⌂' : item === '订单管理' ? '▤' : item === '客户管理' ? '♧' : '◉' }}</span>{{ item }}<span v-if="item === '订单管理'" class="badge">8</span></button></nav>
      <p class="nav-label nav-label-bottom">系统设置</p>
      <nav><button class="nav-item"><span class="nav-icon">⚙</span>偏好设置</button><button class="nav-item"><span class="nav-icon">?</span>帮助中心</button></nav>
      <div class="sidebar-user"><div class="avatar">林</div><div><strong>林晓宇</strong><small>超级管理员</small></div><button class="more-button">•••</button></div>
    </aside>

    <main class="main-content">
      <header class="topbar"><div class="breadcrumb"><span>工作台</span><b>/</b><strong>{{ active }}</strong></div><div class="top-actions"><button class="icon-button">⌕</button><button class="icon-button notification">♢<i></i></button><div class="top-avatar">林</div><button class="logout-button" @click="logout">退出</button></div></header>
      <section class="content-wrap">
        <div class="welcome-row"><div><p class="eyebrow">{{ new Date().toLocaleDateString('zh-CN', { weekday: 'long' }) }} · 2025年8月12日</p><h1>{{ greeting }}，林晓宇 <span>✦</span></h1><p class="muted">这里是今天的业务概览，祝你工作顺利。</p></div><button class="outline-button">⊞ <span>导出报表</span></button></div>
        <div class="stat-grid"><article v-for="stat in stats" :key="stat.label" class="stat-card"><div class="stat-top"><span>{{ stat.label }}</span><span :class="['stat-icon', stat.tone]">{{ stat.icon }}</span></div><div class="stat-value">{{ stat.value }}</div><div :class="['stat-change', stat.tone]">{{ stat.change }} <span>较上月</span></div></article></div>
        <div class="section-grid"><section class="panel chart-panel"><div class="panel-heading"><div><h2>营收趋势</h2><p>近 6 个月的营收变化</p></div><button class="select-button">近 6 个月⌄</button></div><div class="chart"><div class="chart-y"><span>30万</span><span>20万</span><span>10万</span><span>0</span></div><div class="chart-main"><div class="grid-line line-1"></div><div class="grid-line line-2"></div><div class="grid-line line-3"></div><div class="grid-line line-4"></div><svg viewBox="0 0 600 220" preserveAspectRatio="none" aria-label="营收趋势图"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#8c7cff" stop-opacity=".3"/><stop offset="100%" stop-color="#8c7cff" stop-opacity="0"/></linearGradient></defs><path d="M0,178 C45,165 68,150 110,158 S170,126 215,142 S280,95 320,112 S385,70 425,88 S480,54 515,72 S560,33 600,45 L600,220 L0,220 Z" fill="url(#area)"/><path d="M0,178 C45,165 68,150 110,158 S170,126 215,142 S280,95 320,112 S385,70 425,88 S480,54 515,72 S560,33 600,45" fill="none" stroke="#7768f5" stroke-width="3" stroke-linecap="round"/></svg><div class="chart-x"><span>3月</span><span>4月</span><span>5月</span><span>6月</span><span>7月</span><span>8月</span></div></div></div></section><section class="panel goal-panel"><div class="panel-heading"><div><h2>本月目标</h2><p>目标完成进度</p></div><button class="more-button">•••</button></div><div class="progress-ring"><div class="ring-inner"><strong>82%</strong><span>已完成</span></div></div><div class="goal-summary"><div><span class="goal-dot purple"></span><span>营收目标</span><strong>¥ 248,680 <small>/ ¥ 300,000</small></strong></div><div><span class="goal-dot green"></span><span>新增客户</span><strong>1,286 <small>/ 1,500</small></strong></div></div></section></div>
        <section class="panel orders-panel"><div class="panel-heading"><div><h2>最近订单</h2><p>实时查看业务订单状态</p></div><button class="text-button">查看全部 →</button></div><div class="table-wrap"><table><thead><tr><th>订单编号</th><th>客户</th><th>产品 / 服务</th><th>金额</th><th>状态</th><th>下单时间</th></tr></thead><tbody><tr v-for="order in orders" :key="order.id"><td class="order-id">{{ order.id }}</td><td>{{ order.customer }}</td><td>{{ order.product }}</td><td class="amount">{{ order.amount }}</td><td><span :class="['status-pill', order.statusClass]"><i></i>{{ order.status }}</span></td><td class="date">{{ order.date }}</td></tr></tbody></table></div></section>
      </section>
    </main>
  </div>
</template>
