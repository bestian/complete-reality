import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(`<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>complete-reality</title>
  </head>
  <body>
    <h1>流水全真--以佛煉心、以儒應世、以道護體</h1>
    <p>Hono Worker is running.</p>
  </body>
</html>`)
})

export default app