"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FloristsSunFlowerView from "@/app/components/appcomponents/FloristsSunFlowerView";
import Layout from "@/app/components/appcomponents/Layout";
import Offer from "@/app/components/appcomponents/Offer";
import Qualityflowers from "@/app/components/appcomponents/Qualityflowers";
import SadProgram from "@/app/components/appcomponents/SadProgram";
import SpecialOffer from "@/app/components/appcomponents/SpecialOffer";
import SunflowerFlorist from "@/app/components/appcomponents/SunflowerFlorist";
import companyService from "@/services/company-service";
import { AccessDenied } from "./AccessDenied";

export default function FloristPage() {
    const params = useParams();
    const [company, setCompany] = useState(null);
    const slug = params?.slug;
    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        try {
            const response = await companyService.getFloristCompanyBySlug({ slug: slug });

            if (response.company === null) {
                return;
            }
            setCompany(response.company);
        } catch (error) {
            console.log(error);
        }
    };
    console.log('company', company);

    return (
        <>
            {
                (company?.id && company?.status !== "PUBLISHED") ?
                    <AccessDenied /> :
                    <>
                        {
                            company ?

                                <Layout from={"7"} forFooter={"memorypage"} data={company} showHamburger={false}
                                    currentPage="">
                                    <div className="flex flex-1 flex-col bg-[#F5F7F9]">
                                        <div className="flex flex-col relative mx-auto overflow-auto w-full bg-[#F5F7F9]">
                                            <FloristsSunFlowerView data={company} />
                                            <Offer data={company} />
                                            <SadProgram key={company?.id} data={company} />
                                            <Qualityflowers data={company} />
                                            <SpecialOffer key={company?.id} data={company} />
                                            <SunflowerFlorist key={company?.id} data={company} />
                                        </div>
                                    </div>
                                </Layout> : null
                        }
                    </>
            }
        </>
    );
}