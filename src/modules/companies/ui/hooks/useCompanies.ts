import {useGetCompanies} from "@/src/modules/companies/ui/hooks/useGetCompanies";
import {useCreateCompany} from "@/src/modules/companies/ui/hooks/useCreateCompany";
import {PathValue, useForm} from "react-hook-form";
import {
    CreateCompanySchemaType,
    createCompanySchemaValidate
} from "@/src/modules/companies/ui/validators/CreateCompanySchemaValidate";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

export type CompaniesBehavior = ReturnType<typeof useCompanies>;

export const useCompanies = () => {
    const form = useForm<CreateCompanySchemaType>({
        mode: "onChange",
        resolver: zodResolver(createCompanySchemaValidate),
        defaultValues: {
            address: "",
            companyName: "",
            email: "",
            phone: "",
            creationDate: ""
        }
    })

    const getCompaniesBehavior = useGetCompanies();
    const createCompaniesBehavior = useCreateCompany()

    const { mutate: createCompany, isPending, error, isSuccess, reset } = createCompaniesBehavior;

    const [isOpen, setIsOpen] = useState(false);

    function handleChange<K extends keyof CreateCompanySchemaType>({key, value}:{
        key: K,
        value: PathValue<CreateCompanySchemaType, K>;
                          }){
        form.setValue(key, value);
    }

    const onSubmit = (data: CreateCompanySchemaType) => {
        createCompany({
            ...data,
        }, {
            onSuccess: () => {
               resetForm()
                setTimeout(() => {
                    setIsOpen(false);
                    reset();
                }, 1500);
            }
        });
    };

    function handleOpen(){
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
        reset()
        resetForm();
    }

    function resetForm() {
        form.reset({
            address: "",
            companyName: "",
            email: "",
            phone: "",
            creationDate: ""
        })
    }

    return {
        handleOpen,
        isPending,
        isSuccess,
        error,
        handleChange,
        isOpen,
        handleClose,
        form,
        getCompaniesBehavior,
        createCompaniesBehavior,
        onSubmit
    }
}