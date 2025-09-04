import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import SmartDialog from "../src/components/SmartDialog";

export default function App() {
  const [open, setOpen] = useState(false);
  const [dialogUrl, setDialogUrl] = useState("");

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        نمایش فرم سفارشی
      </Button>

      {/* <SmartDialog open={open} setOpen={setOpen} url="https://react.dev/" /> */}
      {/* <Box sx={{ p: 3 }}>
          <Typography variant="h6">فرم سفارشی</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            اینجا می‌تونی هر کامپوننتی بذاری، مثل فرم ورود یا توضیحات.
          </Typography>
        </Box>
      </SmartDialog> */}

      <SmartDialog
        open={open}
        setOpen={setOpen}
        // url="https://react.dev/"
        setDialogUrl={setDialogUrl}

        // Props سفارشی برای Dialog
        dialogProps={{ fullScreen: false, maxWidth: "lg" }}
        // Props سفارشی برای Drawer
        drawerProps={{ disableSwipeToOpen: true }}

        // ارتفاع و کلاس‌ها
        drawerHeight="80%"
        drawerPaperClassName="bg-red-500"
        drawerPaperSx={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}

        contentBoxClassName="p-4"
        contentBoxSx={{ backgroundColor: "#fefefe" }}

        pullerClassName="bg-gray-400 dark:bg-gray-700"
        pullerSx={{ width: 40 }}

        arrowClassName="text-gray-500"
        arrowSx={{ fontSize: 30 }}

        iframeReloadCount={0}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">فرم سفارشی</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            اینجا می‌تونی هر کامپوننتی بذاری، مثل فرم ورود یا توضیحات.
          </Typography>
        </Box>
      </SmartDialog>

    </>
  );
}
