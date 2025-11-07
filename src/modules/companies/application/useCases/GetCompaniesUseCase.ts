import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";

export class GetCompaniesUseCase {
    constructor(private companyRepository: ICompanyRepository) {}

    async execute() {
        return this.companyRepository.getAll()
    }
}