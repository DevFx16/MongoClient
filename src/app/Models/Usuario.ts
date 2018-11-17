export default class Usuario {

    Username: string;
    Password: string;
    Role = [{ role: '', db: '' }];

    constructor(Username: string, Password: string, Role: [{ role: '', db: '' }]) {
        this.Username = Username;
        this.Role = Role;
        this.Password = Password;
    }
}