import {GetCompaniesApiResponse} from "@/src/modules/companies/infra/api-responses/GetCompaniesApiResponse";
import {Company} from "@/src/modules/companies/domain/entities/Company";
import {CreateCompanyApiResponse} from "@/src/modules/companies/infra/api-responses/CreateCompanyApiResponse";
import {CreateCompanyCommand, CreateCompanyResponse} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";

export class CompanyFactory {

    static formatGetCompaniesFromApiResponse(data: GetCompaniesApiResponse): Company[] {
        return data.companies.map((company): Company => ({
            id: company.company_id,
            companyName: company.company_name,
            email: company.company_email,
            phone: company.company_phone,
            address: company.company_address,
            creationDate: company.created_at,
        }));
    }

    static formatCreateCompanyFromApiResponse(data: CreateCompanyApiResponse, command: CreateCompanyCommand): CreateCompanyResponse {
        return {
            company: {
                id: data.companyId,
                ...command,
            },
            isSaved: data.isSaved,
            message: data.message
        }
    }
}
