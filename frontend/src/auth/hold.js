// user.js
class UserManager {
    static user_id = null;
    
    static set(data) {
        this.user_id = data;
    }
    
    static get() {
        return this.user_id;
    }
    
    static clear() {
        this.user_id = null;
    }
    
    static isSet() {
        return this.user_id !== null;
    }
}

export default UserManager;