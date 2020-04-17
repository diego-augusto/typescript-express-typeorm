import Setup from './application/Setup'

Promise.resolve(Setup.setup()).then((app) => {
    app.listen(1337, () => {
        console.log(`App listening on the http://localhost: ${1337}`)
    })
}).catch((error) => {
    console.log(error)
})
