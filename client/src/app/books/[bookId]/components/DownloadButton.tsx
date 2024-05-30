"use client"

import { Button } from "@/components/ui/button"


const DownloadButton = ({ filePath }: { filePath: string }) => {
    const handleDownload = ()=>{
        window.open(filePath, "_blank");
    }
    return (
        <div>                  
            <Button className="mt-5" onClick={() => handleDownload()}>Download</Button>
        </div>
    )
}

export default DownloadButton