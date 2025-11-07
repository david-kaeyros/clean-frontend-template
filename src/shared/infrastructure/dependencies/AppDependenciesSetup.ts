import {setupCompaniesDependencies} from "@/src/modules/companies/infra/di/setupCompaniesDependencies";

export function appDependenciesSetup(){
    setupCompaniesDependencies()
}
appDependenciesSetup();