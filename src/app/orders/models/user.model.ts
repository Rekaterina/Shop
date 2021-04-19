export class UserModel {
    constructor(
        public firstName = '',
        public lastName = '',
        public email = '',
        // думаю, это поле должно быть массивом
        public phone = '',
        public address = '',
        public pickup = false,
    ) {}
}
