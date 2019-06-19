const Koa = require('koa')
const fs = require('fs')
const staticCache = require('koa-static-cache')
const path = require('path')

const app = new Koa()

app.use(staticCache(path.resolve(__dirname, './dist/'), {
    prefix: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 缓存一个月
    gzip: true
}))

app.use(async ctx => {
    if (ctx.path === '/') {
        let data = await fs.readFileSync(path.resolve(__dirname, './dist/index.html'))
        let str = String(data)
        ctx.body = str
    }
})

app.listen(9000, () => console.log(`Server Running At club.icooer.com`))