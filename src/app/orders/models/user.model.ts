export class UserModel {
    constructor(
        public firstName = '',
        public lastName = '',
        public email = '',
        public phone = '',
        public address = '',
        public pickup = false,
    ) {}
}
