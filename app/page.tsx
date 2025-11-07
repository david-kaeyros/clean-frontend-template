"use client"
import "@/src/shared/infrastructure/dependencies/AppDependenciesSetup"

import ListCompaniesView from "@/src/modules/companies/ui/index/ListCompaniesView";

export default function Home() {
    return (
        <ListCompaniesView/>
    );
}
