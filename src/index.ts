import Setup from './application/Setup'

Promise.resolve(Setup.setup()).then((app) => {
    const port = process.env.PORT || 1337
    app.listen(port, () => {
        console.log(`App listening on the http://localhost: ${port}`)
    })
}).catch((error) => {
    console.log(error)
})
