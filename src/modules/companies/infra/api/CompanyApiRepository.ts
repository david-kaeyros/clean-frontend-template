import {HttpClient} from "@/src/shared/infrastructure/http/HttpClient";
import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {GetCompaniesApiResponse} from "@/src/modules/companies/infra/api-responses/GetCompaniesApiResponse";
import {CompanyFactory} from "@/src/modules/companies/infra/factory/CompanyFactory";
import {companiesApiRoutes} from "@/src/modules/companies/infra/api-routes/companiesApiRoutes";
import {CreateCompanyApiResponse} from "@/src/modules/companies/infra/api-responses/CreateCompanyApiResponse";
import {CreateCompanyCommand} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {Company} from "@/src/modules/companies/domain/entities/Company";

export class CompanyApiRepository extends HttpClient implements ICompanyRepository {
    private companies: GetCompaniesApiResponse = {
        companies: [
            {
                company_id: "1",
                company_name: "SABC",
                company_email: "sabc@ccontact.com",
                company_phone: "1990-03-12",
                company_address: "bali, douala, cameroun",
                created_at: "2025-11-07T00:00:00Z",
                updated_at: "2025-11-07T00:00:00Z"
            }
        ]
    };

    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com");
    }

    // Real implementation

    // async getAll() {
    //     const data = await this.get<GetCompaniesApiResponse>(companiesApiRoutes.getAll);
    //     return CompanyFactory.formatGetCompaniesFromApiResponse(data)
    // }

    async getAll(): Promise<Company[]> {
        // return mock data instead of calling real API
        const data = this.companies;

        // format it like your factory expects
        return CompanyFactory.formatGetCompaniesFromApiResponse(data);
    }



    async create(command: CreateCompanyCommand) {
        const data = await this.post<CreateCompanyApiResponse>(companiesApiRoutes.create, command);
        return CompanyFactory.formatCreateCompanyFromApiResponse(data, command);
    }
}
