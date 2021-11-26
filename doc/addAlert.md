# addAlert method intro

- addAlert(level, message, arg1, arg2) is a method of Application.js
- takes 4 arguments
    - level (string) 
        - sets message's styling variant as per bootstrap standard ('success', 'danger', 'warning', 'light', ...)

    - message (string || function (in functional component only)) 
        - as per i18n standard

    - arg1, arg 2 (one of them is a number, the other is a boolean) 
        - both otional arguments
        - stand for expiration time in seconds (default is 5 seconds) and a boolean deciding wheter the message should be translated(especially for class components, default set to false)

# example of use

- in class component 
    - this.App.addAlert("danger", "ASABAuthModule|You are not authorized to use this application", 3600, true)
    - this.App.addAlert("danger", "ASABAuthModule|You are not authorized to use this application", true, 3)

- in functional component
    - props.app.addAlert("warning", t(`ASABConfig|Unable to get types`))
    - props.app.addAlert("success", t(`ASABConfig|Unable to get types`), 10)
