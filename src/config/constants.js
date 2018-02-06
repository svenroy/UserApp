const constants = {
    userRoles : {
        user: "user",
        client: "client"
    },

    awsUserAttributes:{
        role: "custom:role"
    }
}

global.utils = {
    ...global.utils,
    constants
}

export default constants;