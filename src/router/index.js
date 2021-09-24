'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Setup from '../components/Setup.vue'
import Staffs from '../components/Staffs.vue'
import GlyphGenerator from '../components/GlyphGenerator.vue'
import About from '../components/About.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/setup',
        name: 'Setup',
        component: Setup
    },
    {
        path: '/staffs',
        name: 'Staffs',
        component: Staffs
    },
    {
        path: '/glyph-generator',
        name: 'GlyphGenerator',
        component: GlyphGenerator
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router