import {Company} from "@/src/modules/companies/domain/entities/Company";
import {CreateCompanyCommand, CreateCompanyResponse} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {
    UpdateCompanyCommand,
    UpdateCompanyResponse
} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";

export interface ICompanyRepository {
    getAll(): Promise<Company[]>;
    create(command: CreateCompanyCommand): Promise<CreateCompanyResponse>;
    update(command: UpdateCompanyCommand): Promise<UpdateCompanyResponse>;
}
