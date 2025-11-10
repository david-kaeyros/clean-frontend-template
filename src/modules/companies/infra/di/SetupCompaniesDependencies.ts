import {CompanyApiRepository} from "@/src/modules/companies/infra/api/CompanyApiRepository";
import {companyDependencies} from "@/src/modules/companies/infra/di/CompanyDiContainer";
import {GetCompaniesUseCase} from "@/src/modules/companies/application/useCases/GetCompaniesUseCase";
import {CreateCompanyUseCase} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {UpdateCompanyUseCase} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";
import {DeleteCompanyUseCase} from "@/src/modules/companies/application/useCases/DeleteCompanyUseCase";


let setupCalled = false;

export function setupCompaniesDependencies() {
    // Prevent double initialization
    if (companyDependencies.isInitialized() || setupCalled) {
        console.log('⚠️  Companies module already initialized, skipping...');
        return;
    }

    setupCalled = true;
    console.log('🔧 Setting up Companies module dependencies...');

    try {
        // 1. Register infrastructure (repositories)
        const companyRepository = new CompanyApiRepository()
        companyDependencies.registerSingleton("CompanyApiRepository", companyRepository);

        // 2. Register Application Layer (Factories)
        // Each use case gets a fresh instance when resolved
        companyDependencies.register(
            "GetCompaniesUseCase",
            () => new GetCompaniesUseCase(companyRepository)
        );
        companyDependencies.register(
            "CreateCompanyUseCase",
            () => new CreateCompanyUseCase(companyRepository)
        );
        companyDependencies.register(
            "UpdateCompanyUseCase",
            () => new UpdateCompanyUseCase(companyRepository)
        );
        companyDependencies.register(
            "DeleteCompanyUseCase",
            () => new DeleteCompanyUseCase(companyRepository)
        );

        // Mark as initialized
        companyDependencies.markAsInitialized();
    } catch (error) {
        setupCalled = false; // Allow retry on failure
        console.error('❌ Failed to initialize Companies module:', error);
        throw error;
    }
}