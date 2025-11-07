import {Company} from "@/src/modules/companies/domain/entities/Company";
import {CreateCompanyCommand, CreateCompanyResponse} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";

export interface ICompanyRepository {
    getAll(): Promise<Company[]>;
    create(command: CreateCompanyCommand): Promise<CreateCompanyResponse>;
}
