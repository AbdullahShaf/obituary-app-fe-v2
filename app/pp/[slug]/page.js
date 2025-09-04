"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/appcomponents/Layout";
import FuneralsCompanyBanner from "@/app/components/appcomponents/FuneralsCompanyBanner";
import ObitList from "@/app/components/appcomponents/ObitList";
import Cemeteries from "@/app/components/appcomponents/Cemeteries";
import FuneralInFewDays from "@/app/components/appcomponents/FuneralInFewDays";
import Pride from "@/app/components/appcomponents/Pride";
import { FrequentlyAskedQuestionView } from "@/app/components/appcomponents/FrequentlyAskedQuestionView";

import companyService from "@/services/company-service";
import { AccessDenied } from "./AccessDenied"
export default function FuneralPage() {
    const params = useParams();
    const [company, setCompany] = useState(null);
    const slug = params?.slug;
    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        try {
            const response = await companyService.getFuneralCompanyBySlug({ slug: slug });

            if (response.company === null) {
                return;
            }
            setCompany(response.company);
        } catch (error) {
            console.log(error);
        }
    };
    console.log('>>>>>>>>> company', company);

    return (
        <>
            {

                (company?.id && company?.status !== "PUBLISHED") ?
                    <AccessDenied /> :

                    <>
                        {company ? <Layout
                            from={"18"}
                            data={company}
                            forFooter={"company"}
                            isMegaMenuVisible={undefined}
                            megaMenu={undefined}
                            handleCloseModal={() => setOpenModal(false)}
                            isModalLayout
                        >
                            <div className="flex flex-col mx-auto w-full bg-[#F5F7F9]">
                                <FuneralsCompanyBanner
                                    key={`${company?.id}-banner`}
                                    data={company}
                                />
                                <ObitList key={`${company?.id}-last-obituaries`} userId={company?.userId} />
                                <FuneralInFewDays
                                    key={`${company?.id}-funeral-in-few-days`}
                                    data={company}
                                />
                                <Cemeteries key={`${company?.id}-cemeteries`} data={company} />
                                <Pride key={`${company?.id}-pride`} data={company} />
                                <FrequentlyAskedQuestionView
                                    key={`${company?.id}-faq`}
                                    data={company}
                                    from={"2"}
                                />
                            </div>
                        </Layout> : null}
                    </>
            }

        </>
    );
}