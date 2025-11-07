export interface GetCompaniesApiResponse {
    companies: {
        company_id: string;
        company_name: string;
        company_email: string;
        company_phone: string;
        company_address: string;
        created_at: string;
        updated_at: string;
    }[];
}