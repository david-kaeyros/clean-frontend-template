import {companyDependencies} from "@/src/modules/companies/infra/di/container";
import {useQuery} from "@tanstack/react-query";

export const useGetCompanies = () => {
    const getCompaniesUseCase = companyDependencies.resolve('GetCompaniesUseCase');

    return useQuery({
        queryKey: ['companies'],
        queryFn: () => getCompaniesUseCase.execute(),
        staleTime: 5 * 60 * 1000,
    });
};