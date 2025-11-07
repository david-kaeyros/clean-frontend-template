export class Company {
    constructor(
        public readonly id: string,
        public readonly companyName: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly address: string,
        public readonly creationDate: string,
    ) {
    }
}