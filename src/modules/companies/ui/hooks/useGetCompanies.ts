import {companyDependencies} from "@/src/modules/companies/infra/di/container";
import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";

export const useGetCompanies = () => {
    const getCompaniesUseCase = companyDependencies.resolve('GetCompaniesUseCase');

    useEffect(() => {
        getCompaniesUseCase.execute().then((res) => {
            console.log(res)
        })
    }, [getCompaniesUseCase]);
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => getCompaniesUseCase.execute(),
        staleTime: 5 * 60 * 1000,
    });
};