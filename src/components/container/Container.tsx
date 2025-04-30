import { ReactNode } from "react";

export function Container({children}:{children: ReactNode}){
    return(
        <div className="w-full max-w-7xl mx-auto max-2xl:px-0 max-xl:px-4 ">
            {children}
        </div>
    )
}