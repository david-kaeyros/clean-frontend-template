import {GetCompaniesUseCase} from "@/src/modules/companies/application/useCases/GetCompaniesUseCase";
import {CreateCompanyUseCase} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {UpdateCompanyUseCase} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";
import {DeleteCompanyUseCase} from "@/src/modules/companies/application/useCases/DeleteCompanyUseCase";
import {DIContainer} from "@/src/shared/infrastructure/di/DIContainer";

export interface CompanyServiceRegistry {
    // Infrastructure Layer
    CompanyApiRepository: ICompanyRepository;

    // Application Layer (Use Cases)
    GetCompaniesUseCase: GetCompaniesUseCase;
    CreateCompanyUseCase: CreateCompanyUseCase;
    UpdateCompanyUseCase: UpdateCompanyUseCase;
    DeleteCompanyUseCase: DeleteCompanyUseCase;
}

export const companyDependencies = new DIContainer<CompanyServiceRegistry>("companies");
