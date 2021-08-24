export default {
    install(app, options){
        app.config.globalProperties.$message = text => {
            M.toast({html: text})
        }
        app.config.globalProperties.$error = text => {
            M.toast({html: `[Помилка]: ${text}`})
        }
    }
}