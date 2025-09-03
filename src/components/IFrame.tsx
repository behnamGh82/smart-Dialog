import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
    activeUrl?: string;
    reloadCount: number;
}

export default function IFrame({ activeUrl, reloadCount }: IProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [activeUrl, reloadCount]);

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <Grid className="w-full h-full relative">
            <iframe
                className="w-full h-full border-0"
                src={activeUrl || "about:blank"}
                onLoad={handleLoad}
                key={(activeUrl ?? "blank") + reloadCount}
                title="custom-iframe"
            />
            {loading && (
                <Box
                    className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white"
                    sx={{ zIndex: 10 }}
                >
                    <CircularProgress />
                </Box>
            )}
        </Grid>
    );
}
