import Helmet from "react-helmet";
import conf from "@/conf/conf.ts";
export default function HostelAllotment() {
    return <>
        <Helmet><title>{conf.siteTitle} - Hostel Allotment</title></Helmet>
        <div>Hostel Allotment</div>
    </>
}