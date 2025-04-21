import {DashboardHeader} from '@/app/dashboard/components/header/HeaderDashboard'

export default function DashboardLayout({children}:{children:React.ReactNode}){
    return (
        <>
            <DashboardHeader/>
            {children}
        </>
    )
}