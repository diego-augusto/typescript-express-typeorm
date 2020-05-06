import Setup from './application/Setup'

Promise.resolve(Setup.setup()).then((app) => {
    const port = process.env.PORT || 1337
    app.listen(port, () => {
        // tslint:disable-next-line: no-console
        console.log(`App listening on the http://localhost: ${port}`)
    })
}).catch((error) => {
    // tslint:disable-next-line: no-console
    console.log(error)
})
