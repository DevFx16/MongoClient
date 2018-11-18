export class Usuario {

    Username: string;
    Password: string;
    Role: Roles[];

    constructor(Username: string, Password: string, Role: Roles[]) {
        this.Username = Username;
        this.Role = Role;
        this.Password = Password;
    }
}

export class Roles {

    role: string;
    db: string;

    constructor(role: string, db: string) {
        this.role = role;
        this.db = db;
    }

}