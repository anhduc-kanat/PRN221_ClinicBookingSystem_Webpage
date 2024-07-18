import { Helmet } from "react-helmet-async";
import { SpecificationView } from "src/sections/admin";

export default function SpecificationManagementPage() {

    return (
        <>
            <Helmet>
                <title> Specification Management </title>
            </Helmet>

            <SpecificationView />
        </>
    )
}