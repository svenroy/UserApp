//Todo: Create an Exceptions module that will be injected in
function NullorUndefinedException(message) {
    this.message = message;
    this.name = "NullorUndefinedException";
    this.toString = function () {
        return this.name + ": " + this.message;
    };
};

const guard = (value, message = "value is null or undefined") => {
    if (value === undefined) {
        throw new NullorUndefinedException(message);
    }

    if (value === null) {
        throw new NullorUndefinedException(message);
    }

    return value;
};

global.utils = {
    ...global.utils,
    guard
};

export default guard;