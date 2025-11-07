import {HttpClient} from "@/src/shared/infrastructure/http/HttpClient";
import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {CompanyFactory} from "@/src/modules/companies/infra/factory/CompanyFactory";
import {
    CreateCompanyCommand,
    CreateCompanyResponse
} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {Company} from "@/src/modules/companies/domain/entities/Company";
import {generateUUID} from "@/src/shared/utils/GenerateUUID";

export class CompanyApiRepository extends HttpClient implements ICompanyRepository {
    private companies: Company[] = [
        {
            id: "1",
            companyName: "SABC",
            email: "sabc@ccontact.com",
            phone: "1990-03-12",
            address: "bali, douala, cameroun",
            creationDate: "2025-11-07T00:00:00Z",
        }
    ];

    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com");
    }

    // Implementation with real API

    // async getAll() {
    //     const data = await this.get<GetCompaniesApiResponse>(companiesApiRoutes.getAll);
    //     return CompanyFactory.formatGetCompaniesFromApiResponse(data)
    // }

    async getAll(): Promise<Company[]> {
        // return mock data instead of calling real API
        return this.companies;

    }

    // Implementation with real API

    // async create(command: CreateCompanyCommand) {
    //     const data = await this.post<CreateCompanyApiResponse>(companiesApiRoutes.create, command);
    //     return CompanyFactory.formatCreateCompanyFromApiResponse(data, command);
    // }

    async create(command: CreateCompanyCommand): Promise<CreateCompanyResponse> {
        // Mock Save
        const company: Company = {
            id: generateUUID(),
            ...command,
        }
        this.companies.push(company)

        return {
            company: company,
            isSaved: true,
            message: "Company created successfully",
        }
    }
}
