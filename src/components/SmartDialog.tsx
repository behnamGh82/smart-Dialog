import type { Dispatch, ReactNode } from "react";
import { Dialog, DialogContent, SwipeableDrawer, Typography, styled, useMediaQuery, useTheme, type SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IFrame from "./IFrame";

interface SmartDialogProps {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    url?: string;
    setDialogUrl?: Dispatch<React.SetStateAction<string>>;
    children?: ReactNode;
    drawerHeight?: string;
    drawerPaperSx?: SxProps;
    drawerPaperClassName?: string;
    contentBoxSx?: SxProps;
    contentBoxClassName?: string;
    pullerSx?: SxProps;
    pullerClassName?: string;
    arrowSx?: SxProps;
    arrowClassName?: string;
    iframeReloadCount?: number;
    dialogProps?: Omit<React.ComponentProps<typeof Dialog>, "open" | "onClose" | "children">;
    drawerProps?: Omit<
        React.ComponentProps<typeof SwipeableDrawer>,
        "open" | "onClose" | "children" | "onOpen"
    >;
}

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: grey[100],
    ...(theme.palette.mode === "dark" && {
        backgroundColor: theme.palette.background.default,
    }),
}));

const StyledBox = styled("div")(({ theme }) => ({
    backgroundColor: "#fff",
    ...(theme.palette.mode === "dark" && {
        backgroundColor: grey[800],
    }),
}));

const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
    ...(theme.palette.mode === "dark" && {
        backgroundColor: grey[900],
    }),
}));

export default function SmartDialog({ open, setOpen, url, setDialogUrl, children, drawerHeight = "90%", drawerPaperSx, drawerPaperClassName, contentBoxSx, contentBoxClassName, pullerSx, pullerClassName, arrowSx, arrowClassName, iframeReloadCount = 0, dialogProps, drawerProps }: SmartDialogProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const drawerBleeding = 0;

    const handleClose = () => {
        setOpen(false);
        if (setDialogUrl) setDialogUrl("");
    };

    if (!isMobile) {
        return (
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" {...dialogProps}>
                <DialogContent sx={{ height: "90vh", zIndex: 10 }}>
                    {children ?? <IFrame activeUrl={url} reloadCount={iframeReloadCount} />}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Root>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={handleClose}
                onOpen={() => setOpen(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                keepMounted
                PaperProps={{ sx: { height: drawerHeight, overflow: "visible", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", ...drawerPaperSx }, className: drawerPaperClassName }}
                {...drawerProps}
            >
                <StyledBox sx={{ position: "absolute", top: -drawerBleeding, borderTopLeftRadius: 8, borderTopRightRadius: 8, right: 0, left: 0 }}>
                    <Puller sx={pullerSx} className={pullerClassName} />
                    <Typography sx={{ p: 2, color: "text.secondary", textAlign: "center" }}>
                        <KeyboardArrowDownIcon sx={{ color: "text.secondary", ...arrowSx }} className={arrowClassName} />
                    </Typography>
                </StyledBox>

                <StyledBox sx={{ pb: 2, height: "100%", overflow: "auto", mt: 7, ...contentBoxSx }} className={contentBoxClassName}>
                    {children ?? <IFrame activeUrl={url} reloadCount={iframeReloadCount} />}
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}
